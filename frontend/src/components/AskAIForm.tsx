import React from 'react'
import FormModal from './FormModal'
import chatGptIcon from "../../public/chatgpt_black.png"
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import styles from '../../styles/AskAIForm.module.css'
import { Button } from '@mui/material';
import { useForm, useWatch, useFieldArray} from "react-hook-form";


interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


function AskAIForm(props:Props) {
  const ChatGPTIcon = () => (<Image src={chatGptIcon} width={20} height={20} alt="chatgpt" />)
  const { open, setOpen} = props
  const title = "Describe your domain"
  const formModalProps = {title, open, setOpen, icon: <ChatGPTIcon/>}
  const { register, handleSubmit, formState:{ errors }, control, reset, setValue } = useForm();

  return (
    <FormModal {...formModalProps}>
      <form></form>
        <TextField
          multiline
          label="Ask Chat GPT"
          rows={4}
          fullWidth
          className={styles.textArea}
        />

        <div className={styles.buttonWrapper}>
        <Button variant="contained">Send</Button>
        </div>
    </FormModal>
  )
}

export default AskAIForm