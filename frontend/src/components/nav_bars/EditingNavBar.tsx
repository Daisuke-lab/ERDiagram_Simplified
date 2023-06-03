import React, {useState, useEffect, useRef} from 'react'
import { Navbar, Container,Nav  } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import styles from "../../../styles/Navbar.module.css"
import IconButton from '@mui/material/IconButton';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Form from 'react-bootstrap/Form'
import dynamic from 'next/dynamic';
import Divider from '@mui/material/Divider';
import { useAppSelector, useAppDispatch } from '../../helpers/hooks'
import FontFamily from './FontFamily';
import Color from './Color';
import {decreaseHistoryStep, increaseHistoryStep, setCurrentCanvasTextStyle} from '../../../store/reducers/commonReducer';
import getTextarea from '../../helpers/getTextarea';
import FillColor from './FillColor';
import undo from '../../helpers/undo';
import redo from '../../helpers/redo';

const ConnectionTypeSelect = dynamic(() => import('./ConnectionTypeSelect'), { ssr: false });
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: "0px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "40px",
    //width: "80px"
  }));


function EditingNavBar() {
    const currentCanvasTextStyle = useAppSelector(state => state.commons.currentCanvasTextStyle)
    const historyStep = useAppSelector(state => state.commons.historyStep)
    const history = useAppSelector(state => state.commons.history)
    const currentErDiagram = useAppSelector(state => state.erDiagrams.currentErDiagram)
    const currentSimpleText = useAppSelector(state => state.simpleTexts.currentSimpleText)
    const currentSelection = currentErDiagram ?? currentSimpleText
    //const [fontSize, setFontSize] = useState<number>(defaultTextStyle.fontSize)
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const fontSizeRef = useRef<HTMLInputElement>()

    








    const onIncreaseFontSize = () => {
        const textarea = getTextarea()

        if (textarea !== null && currentSelection !== null) {
            const newFontSize = (currentCanvasTextStyle?.fontSize ?? 10) + 1
            const scaleX = currentSelection.scale.x
            const scaleY = currentSelection.scale.y
            if (newFontSize > 9) {
                textarea.style.fontSize = parseFloat(newFontSize.toString())*1 + "px"
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, fontSize: newFontSize}))
            }
            
        }
    }

    const onDecreaseFontSize = () => {
        const textarea = getTextarea()
        if (textarea !== null && currentSelection !== null) {
            const newFontSize = (currentCanvasTextStyle?.fontSize ?? 10) - 1
            const scaleX = currentSelection.scale.x
            const scaleY = currentSelection.scale.y
            if (newFontSize > 9) {
                textarea.style.fontSize = parseFloat(newFontSize.toString())*1 +  "px"
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, fontSize: newFontSize}))
            }
        }
    }

    // const onTextChange = (e:any) => {
    //     const textareas = document.getElementsByTagName('textarea')
    //     const textarea = textareas.length > 0?textareas[0]: null
    //     if (textarea !== null && currentSelection !== null) {
    //         const scaleX = currentSelection.scale.x
    //         const scaleY = currentSelection.scale.y
    //         const fontScale = scaleX<scaleY?scaleX:scaleY
    //         textarea.style.fontSize = parseFloat(e.target.value) * fontScale + "px"
    //     }
    // }

    const onBoldClick = () => {
        const textarea = getTextarea()
        const newFontWeight = textarea?.style.fontWeight === "unset"?"bold":"unset"
        if (textarea !== null) {
            textarea.style.fontWeight = newFontWeight
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, fontWeight: newFontWeight}))
        }
    }

    const onItalicClick = () => {
        const textarea = getTextarea()
        const newFontStyle = textarea?.style.fontStyle === "unset"?"italic":"unset"
        if (textarea !== null) {
            textarea.style.fontStyle = newFontStyle
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, fontStyle: newFontStyle}))
        }
    }

    const onUnderlineClick = () => {
        const textarea = getTextarea()
        const newTextDecorationLine = textarea?.style.textDecorationLine === "underline"?"unset":"underline"
        if (textarea !== null) {
            textarea.style.textDecorationLine = newTextDecorationLine
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, textDecorationLine: newTextDecorationLine}))
        }
    }

    const onTextAlignClick = (textAlign:string) => {
        const textarea = getTextarea()
        const newTextAlign = textAlign === textarea?.style.textAlign?"unset":textAlign
        if (textarea !== null) {
            textarea.style.textAlign = newTextAlign
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, textAlign: newTextAlign}))
        }

    }


    const onRedo = () => {
        dispatch(increaseHistoryStep())
    }




  return (
    <Container className={styles.navOptionsContainer} style={{marginTop:"10px"}}>
        <Item className={styles.canvasOption}>
            <IconButton onClick={() => undo(state, dispatch)} disabled={historyStep === -1}>
        <ArrowBackIcon/>
        </IconButton>

        <IconButton onClick={() => redo(state, dispatch)} disabled={history.length === historyStep + 1 || history.length === 0}>
        <ArrowForwardIcon/>
        </IconButton>
        </Item>

        <Item className={styles.canvasOption}>
        <FontFamily/>
        </Item>

        <Item  className={styles.canvasOption}>
            <IconButton onClick={() => onDecreaseFontSize()}>
                <RemoveIcon/>
            </IconButton>
          <Input
          id="filled-required"
          type="number"
          value={currentCanvasTextStyle.fontSize ?? 0}
          style={{width:"60px"}}
          endAdornment={<InputAdornment position="end">pt</InputAdornment>}
        />
            <IconButton onClick={() => onIncreaseFontSize()}>
                <AddIcon/>
            </IconButton>

        </Item>

        <Item  className={styles.canvasOption}>
        <IconButton color={currentCanvasTextStyle.fontWeight==="bold"?"primary":"default"}
        onClick={() => onBoldClick()}>
            <FormatBoldIcon/>
        </IconButton>
        <IconButton color={currentCanvasTextStyle.fontStyle==="italic"?"primary":"default"} 
        onClick={() => onItalicClick()}>
            <FormatItalicIcon/>
        </IconButton>
        <IconButton  color={currentCanvasTextStyle.textDecorationLine==="underline"?"primary":"default"} 
        onClick={() => onUnderlineClick()}>
            <FormatUnderlinedIcon/>
        </IconButton>
        <Color/>
        </Item>
        <Item className={styles.canvasOption}>
        <IconButton onClick={() => onTextAlignClick("left")}
        color={currentCanvasTextStyle.textAlign==="left"?"primary":"default"} >
            <FormatAlignLeftIcon/>
        </IconButton>
        <IconButton onClick={() => onTextAlignClick("center")}
        color={currentCanvasTextStyle.textAlign==="center"?"primary":"default"}>
            <FormatAlignCenterIcon/>
        </IconButton>
        <IconButton onClick={() => onTextAlignClick("right")}
        color={currentCanvasTextStyle.textAlign==="right"?"primary":"default"}>
            <FormatAlignRightIcon/>
        </IconButton>
        </Item>
        <Item  className={styles.canvasOption} style={{display:"flex"}}>
            <ConnectionTypeSelect direction="source"/>
            <Divider orientation="vertical" flexItem style={{height:"100%"}}/>
            <ConnectionTypeSelect direction="destination"/>
        </Item>
    </Container>
  )
}

export default EditingNavBar