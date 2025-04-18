import React from 'react'
import FormModal from './FormModal'
import chatGptIcon from "../../public/chatgpt_black.png"
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import styles from '../../styles/AskAIForm.module.css'
import { Button } from '@mui/material';
import { useForm, useWatch, useFieldArray} from "react-hook-form";
import { useSnackbar } from 'notistack';
import getAxios from '../helpers/getAxios';
import { useSession } from 'next-auth/react';
import {CustomSessionType} from '../../types'
import { useAppSelector, useAppDispatch } from '../helpers/hooks'


interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface FormData {
  text: string;
}


function AskAIForm(props:Props) {
  const currentRoom = useAppSelector(state => state.commons.currentRoom)
  const ChatGPTIcon = () => (<Image src={chatGptIcon} width={20} height={20} alt="chatgpt" />)
  const { open, setOpen} = props
  const title = "Describe your domain"
  const { data: session} = useSession()
  const axios = getAxios(session as unknown as CustomSessionType | null)
  const { enqueueSnackbar } = useSnackbar();
  const formModalProps = {title, open, setOpen, icon: <ChatGPTIcon/>}
  const { register, handleSubmit, formState:{ errors }, control, reset, setValue } = useForm<FormData>();
  const onSubmit = async (data:FormData) => {
    try {
        const endpoint = `/api/v1/room/ask_ai/${currentRoom?.id}`
        const res = await axios.post(endpoint, data)
        enqueueSnackbar("an user successfully added!", { variant: "success" })
        } catch(err:any) {
          console.log({err})
          enqueueSnackbar(err?.response?.data?.message ?? "Sorry. Something went wrong.", { variant: "error" })
          
        }
  }
  return (
    <FormModal {...formModalProps}>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <TextField
          multiline
          label="Ask Chat GPT"
          rows={4}
          fullWidth
          className={styles.textArea}
          {...register("text", {required: true })}
        />

        <div className={styles.buttonWrapper}>
        <Button variant="contained">Send</Button>
        </div>
        </form>
    </FormModal>
  )
}

export default AskAIForm