import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppSelector, useAppDispatch } from '../helpers/hooks'
import ErDiagramType from '../../types/ErDiagramType'
import { v4 as uuid } from 'uuid';
import getAxios from '../helpers/getAxios';
import { useRouter } from 'next/router'
import { useSession,getSession } from "next-auth/react"
import { CustomSessionType } from '../../types';
import { CAN_EDIT, CREATE, DELETE, ER_DIAGRAM, OWNER, RESTRICTED, UPDATE } from '../constant';
import { addHistory, closeMenu } from '../../store/reducers/commonReducer';




function CustomMenu() {
const dispatch = useAppDispatch()
const displayMenu = useAppSelector(state => state.commons.displayMenu)
const enabledItems = useAppSelector(state => state.commons.enabledItems)
const currentErDiagram = useAppSelector(state=> state.erDiagrams.currentErDiagram)
const currentRow = useAppSelector(state => state.erDiagrams.currentRow)
const currentConnection = useAppSelector(state => state.connections.currentConnection)
const currentPermission = useAppSelector(state => state.commons.currentPermission)
const currentSimpleText = useAppSelector(state => state.simpleTexts.currentSimpleText)
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const router = useRouter()
const {data: session} = useSession()
const axios = getAxios(session as unknown as CustomSessionType | null)
const canEdit = [CAN_EDIT, OWNER].includes(currentPermission) 
let roomId:string | string[] | undefined = undefined
    if (router !== null) {
      roomId = router.query.id
    }


useEffect(()=> {
    const newDiv = document.createElement("div");
    newDiv.style.position = "absolute"
    newDiv.style.left = displayMenu.x + "px"
    newDiv.style.top = displayMenu.y + "px"
    //newDiv.style.display = "none"
    const canvasContainer = document.getElementById("canvas-container")
    canvasContainer?.appendChild(newDiv)
    setAnchorEl(newDiv)
}, [displayMenu.display])
const erDiagramData = {
    title: {id: uuid(), content:"this is title", style:{fontFamily:"Caribri"}, updatedBy: session?.id},
    rows: [],
    x: displayMenu.x,
    y: displayMenu.y,
    rotation: 0,
    scale: {x:1,y:1},
    roomId: roomId,
    updatedBy: session?.id,
}

const getMaxIndex = (erDiagram:ErDiagramType|null) => {
    if (erDiagram !== null) {
        return Math.max.apply(Math, erDiagram.rows.map(function(row) { return row.index; }))
    }
    return -1
}

const rowData = {
    id: uuid(),
    key: {id: uuid(), content:"Field", style:{fontFamily:"Caribri"}, updatedBy: session?.id},
    value:{id: uuid(), content:"Integer", style:{fontFamily:"Caribri"}, updatedBy: session?.id},
    updatedBy: session?.id,
    index: getMaxIndex(currentErDiagram) + 1 
}

const simpleTextData = {
    id: uuid(),
    roomId: roomId,
    x: displayMenu.x,
    y: displayMenu.y,
    rotation: 0,
    scale: {x:1, y:1},
    width: 50,
    height: 50,
    content: "this is text",
    updatedBy: session?.id,


}

const createErDiagram = async () => {
    try {
     const res = await axios.post("api/v1/erDiagram", erDiagramData)

     dispatch(closeMenu())
     console.log(res) 
    } catch(err) {
        console.log(err)
    }
}

const deleteErDiagram = async () => {

    try {
        const res = await axios.delete(`api/v1/erDiagram/${currentErDiagram?.id}`)
        console.log(res)
        dispatch(closeMenu())
    } catch(err) {
        console.log(err)
    }
}


const onAddRow = async () => {
    //historyに追加する前にcurrentErDiagramがwebsocketで書き換えられないか心配。
    if (currentErDiagram !== null) {

    
    try {
        rowData.index = getMaxIndex(currentErDiagram)
        const res = await axios.post(`api/v1/row/${currentErDiagram?.id}`, rowData)
        const newErDiagram = {...currentErDiagram, rows: [...currentErDiagram.rows, res.data]}

        console.log(res)
        dispatch(closeMenu())
    } catch(err) {
        console.log(err)
    }
}
}

const onDeleteRow = async () => {
    if (currentErDiagram !== null && currentRow !== null) {
        const newErDiagram = {...currentErDiagram, rows: currentErDiagram?.rows.filter(row => row.id !== currentRow.id)}
        try {
            const res = await axios.delete(`api/v1/row/${currentErDiagram?.id}/${currentRow?.id}`)
            dispatch(closeMenu())
        } catch (err) {
            console.log(err)
        }
    }
}

const onDeleteConnection = async () => {
    try {
        const res = await axios.delete(`api/v1/connection/${currentConnection?.id}`)
        console.log(res)
        dispatch(closeMenu())
    } catch(err) {
        console.log(err)
    }
}

const onCreateSimpleText = async () => {
    try {
        const res = await axios.post(`api/v1/simpleText`, simpleTextData)
        dispatch(closeMenu())
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}

const onDeleteSimpleText = async () => {
    try {
        const res = await axios.delete(`api/v1/simpleText/${currentSimpleText?.id}`)
        console.log(res)
        dispatch(closeMenu())
    } catch(err) {
        console.log(err)
    }
}

  return <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={displayMenu.display}
                onClose={() => dispatch(closeMenu())}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={onAddRow} disabled={!enabledItems.includes("add-row") || !canEdit}>Add Row</MenuItem>
                <MenuItem onClick={onDeleteRow} disabled={!enabledItems.includes("delete-row") || !canEdit}>Delete Row</MenuItem>
                <MenuItem onClick={createErDiagram} disabled={!enabledItems.includes("add-erDiagram") || !canEdit}>Add ER Diagram</MenuItem>
                <MenuItem onClick={deleteErDiagram} disabled={!enabledItems.includes("delete-erDiagram") || !canEdit}>Delete ER Diagram</MenuItem>
                <MenuItem onClick={onCreateSimpleText} disabled={!enabledItems.includes("add-simple-text") || !canEdit}>Add Simple Text</MenuItem>
                <MenuItem onClick={onDeleteSimpleText} disabled={!enabledItems.includes("delete-simple-text") || !canEdit}>Delete Simple Text</MenuItem>
                <MenuItem onClick={onDeleteConnection} disabled={!enabledItems.includes("delete-connection") || !canEdit}>Delete Connection</MenuItem>
                <MenuItem onClick={() => dispatch(closeMenu())} disabled={!enabledItems.includes("copy") || !canEdit} >Copy</MenuItem>
            </Menu>
        </div>
            }



            
export default CustomMenu;
