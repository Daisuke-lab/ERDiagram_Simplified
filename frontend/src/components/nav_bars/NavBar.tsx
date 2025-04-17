import React, {ChangeEvent, useState, useEffect} from 'react'
import { Navbar, Container,Nav, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import styles from "../../../styles/Navbar.module.css"
import EditingNavBar from './EditingNavBar'
import File from './File'
import Input from '@mui/material/Input';
import { Room } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../helpers/hooks'
import backendAxios from '../../helpers/getAxios';
import { useSession } from 'next-auth/react';
import getAxios from '../../helpers/getAxios';
import { CustomSessionType } from '../../../types';
import Button from '@mui/material/Button';
import ShareForm from '../ShareForm';
import { CAN_EDIT, OWNER } from '../../constant';
import { IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from 'next/router';
import chatGptIcon from "../../../public/chatgpt.png"
import Image from 'next/image'
import AskAIForm from '../AskAIForm';


function NavBar() {

  const ChatGPTIcon = () => (<Image src={chatGptIcon} width={20} height={20} alt="chatgpt" />)
  const currentRoom = useAppSelector(state => state.commons.currentRoom)
  const currentPermission = useAppSelector(state => state.commons.currentPermission)
  const canEdit = [CAN_EDIT, OWNER].includes(currentPermission)
  const [title, setTitle] = useState<string>(currentRoom?.title ?? "Untitled")
  const { data: session } = useSession()
  const axios = getAxios(session as unknown as CustomSessionType | null)
  const [shareOpen, setShareOpen] = useState<boolean>(false) 
  const [aiOpen, setAiOpen] = useState<boolean>(false)
  const router = useRouter()

  //useEffectでわざわざやってやらないとundefinedになってしまう。
  useEffect(() => {
    if (typeof currentRoom?.title === "string") {
      setTitle(currentRoom.title)
    }
  }, [currentRoom?.title])

  const onKeyDown = async (e:React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode;
    const target = e.target as HTMLInputElement
    if (keyCode === 13) {
      const newRoom = {
        ...currentRoom,
        title: target.value
      }
      try {
        const res = await axios.put(`/api/v1/room/${currentRoom?.id}`, newRoom)
        console.log(res)
        target.blur()
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
  <Navbar bg="dark" variant="dark" className={styles.navBar}>
    <Container className={styles.navBarContainer}>
      <IconButton onClick={() => router.push("/rooms")}>
          <ArchitectureIcon className={styles.navBarIcon}/>
          </IconButton>
          <IconButton style={{color:"white"}}>
          <Tooltip 
          title={<a href="https://github.com/Daisuke-lab/ERDiagram_Simplified"  target="_blank"
          style={{color:"white"}}>check source code</a>} 
          placement="top-start">
            <GitHubIcon/>
            </Tooltip>
          </IconButton>
      <Input
          value={title}
          className={styles.titleInput}
          onKeyDown={onKeyDown}
          disabled={!canEdit}
          onChange={(e:any) => {setTitle(e.target.value)}}
        />
    </Container>
    <Container className={styles.navOptionsContainer}>
      <Nav.Item className={styles.navOption}>
          <File/>
      </Nav.Item>
      <Nav.Item className={styles.navOption}>
          <Button className={styles.navButton} onClick={() => setShareOpen(true)}>
            Share
          </Button>
      </Nav.Item>
      <Nav.Item className={styles.navOption}>
        <Tooltip title="Right-Click white screen. Everything starts from there." placement="top">
        <Button className={styles.navButton}>
          Help
        </Button>
          </Tooltip>
      </Nav.Item>
      <Nav.Item className={styles.navOption}>
        <Button className={styles.navButton} endIcon={<ChatGPTIcon/>} onClick={() => setAiOpen(!aiOpen)}>
          Ask AI
        </Button>
      </Nav.Item>
    </Container>
    <EditingNavBar/>
  </Navbar>
  {shareOpen?(<ShareForm open={shareOpen} setOpen={setShareOpen} />):(<></>)}
  {aiOpen?(<AskAIForm open={aiOpen} setOpen={setAiOpen} />):(<></>)}
</>
  )
}

export default NavBar