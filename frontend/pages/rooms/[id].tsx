import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Conva = dynamic(() => import('../../src/components/Conva'), { ssr: false });
import { useAppSelector, useAppDispatch } from '../../src/helpers/hooks'
//import Conva from "../src/components/Conva"
import NavBar from "../../src/components/nav_bars/NavBar"
import {CustomSessionType} from '../../types'
import backendAxios from '../../src/helpers/getAxios';
import { useRouter } from 'next/router'
import {RoomType} from '../../types/RoomType'
import SockJsClient from 'react-stomp';
import {MessageType} from "../../types"
import { getSession, useSession } from "next-auth/react"
import getAxios from '../../src/helpers/getAxios';
import reflectConnectionChange from '../../src/helpers/reflectConnectionChange';
import ErrorDialog from "../../src/components/ErrorDialog"
import { CAN_EDIT, CAN_READ, CONNECTION, ER_DIAGRAM, NO_PERMISSION, OWNER, SIMPLE_TEXT } from '../../src/constant';
import hasAccessToRoom from '../../src/helpers/hasAccessToRoom';
import getCurrentPermission from '../../src/helpers/getCurrentPermission';
import PermissionType from '../../types/PermissionType';
import ConnectionType from '../../types/ConnectionType';
import reflectSimpleTextChange from '../../src/helpers/reflectSimpleTextChange';
import SimpleTextType from '../../types/SimpleTextType';
import { setSimpleTexts } from '../../store/reducers/simpleTextReducer';
import { addHistory, setCurrentPermission, setCurrentRoom} from '../../store/reducers/commonReducer';
import { setErDiagrams } from '../../store/reducers/erDiagramReducer';
import { setConnections } from '../../store/reducers/connectionReducer';
import ErDiagramType from '../../types/ErDiagramType';
import reflectErDiagramChange from '../../src/helpers/reflectErDiagramChange';
import ChangeType from '../../types/ChangeType';


interface Props {
  erDiagrams: ErDiagramType[],
  connections: ConnectionType[],
  simpleTexts: SimpleTextType[],
  currentRoom: RoomType,
  permission: PermissionType
}



const Room: NextPage = (props) => {
  const SOCKET_URL = `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/ws-message`;
  const {erDiagrams, connections, currentRoom, simpleTexts} = props as Props
  const state = useAppSelector(state => state)
  const [errorText, setErrorText] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const handleCloseRef = useRef<() => void>(null)
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const clientRef = useRef<typeof SockJsClient>()
  const router = useRouter()
  const {id:roomId} = router.query
  const { data: session } = useSession()
  const currentPermission = useAppSelector(state => state.commons.currentPermission)
  let handleClose = () => {
    setErrorDialogOpen(false)
    if (currentPermission === NO_PERMISSION) {
      //router.push("/rooms")
    }
  }

  

  useEffect(() => {
    const permission = getCurrentPermission(currentRoom, (session as unknown) as null | CustomSessionType)
    switch(permission) {
      case CAN_READ:
        setTitle("Warning")
        setErrorText("your access level to this room is limited. You can't edit the content.")
        setErrorDialogOpen(true)
        break;
      case NO_PERMISSION:
        setTitle("Permission Error / Not Found")
        setErrorText("you don't have any permission to this room or the room does not exist.")
        setErrorDialogOpen(true)
        break;
      default:
        break;
    }
    dispatch(setCurrentPermission(permission))
  }, [session, currentRoom])


  useEffect(() => {
    console.log(SOCKET_URL)
    dispatch(setCurrentRoom(currentRoom))
    dispatch(setErDiagrams(erDiagrams))
    dispatch(setConnections(connections))
    dispatch(setSimpleTexts(simpleTexts))
  }, [])

  

    const onMessageReceived = (msg:MessageType<any>) => {
        console.log("you've received a new message")
        console.log(msg)
        const change =  {
          shapeName: msg.dataType,
          method: msg.method,
          from: msg.oldData,
          to: msg.newData
      } as ChangeType
      if (!(msg.isRedo || msg.isUndo)) {
        dispatch(addHistory(change))
      }
        
        switch (msg.dataType) {
          case ER_DIAGRAM:
            reflectErDiagramChange(state, dispatch, msg)
            break;
          case CONNECTION:
            reflectConnectionChange(state, dispatch, msg)
            break;
          case SIMPLE_TEXT:
            reflectSimpleTextChange(state, dispatch, msg)
            break;
        }
      }

  
  return (
    <div>
      <NavBar/>
      {currentPermission !== NO_PERMISSION && currentPermission !== undefined?
      <Conva/>:<></>}
      <SockJsClient
        url={SOCKET_URL}
        topics={[`/user/${roomId}/erDiagrams`, `/user/${roomId}/connections`, `/user/${roomId}/simpleTexts`]}
        // onConnect={console.log("Connected")}
        // onDisconnect={console.log("Disconnected!")}
        onMessage={(msg:any) => onMessageReceived(msg)}
        //debug={true}
        ref={clientRef}
      />
      <ErrorDialog open={errorDialogOpen} setOpen={setErrorDialogOpen} text={errorText} handleClose={handleClose}
      title={title}/>
    </div>
  )
}

export async function getServerSideProps(context:any) {
  const session = await getSession(context)
  const axios = getAxios(session as unknown as CustomSessionType | null)
  const roomId = context.params.id
  let erDiagrams:ErDiagramType[] = []
  let connections:ConnectionType[] = []
  let simpleTexts:SimpleTextType[] = []
  let currentRoom:RoomType | null = null

  try {
    const res = await axios.get(`/api/v1/room/${roomId}`)
    currentRoom = res.data
  } catch (err) {
    console.log(err)
  }
  try {
    const res = await axios.get(`/api/v1/erDiagram/list/${roomId}`)
    erDiagrams = res.data
  } catch(err) {
    console.log(err)
  }

  try {
    const res = await axios.get(`/api/v1/connection/list/${roomId}`)
    connections = res.data
  } catch(err) {
    console.log(err)
  }

  try {
    const res = await axios.get(`/api/v1/simpleText/list/${roomId}`)
    simpleTexts = res.data
  } catch(err) {
    console.log(err)
  }

  // if (!hasAccessToRoom(currentRoom, session as unknown as CustomSessionType | null)) {
  //   return { redirect: {permanent: false,
  //     destination: '/'} }
  // }
  
  return {
    props: {
      erDiagrams,
      connections,
      simpleTexts,
      currentRoom
    },
  }
}

export default Room
