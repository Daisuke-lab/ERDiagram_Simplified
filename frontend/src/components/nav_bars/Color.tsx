import React, {useRef, useState} from 'react'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { SketchPicker } from 'react-color';
import { useAppSelector, useAppDispatch } from '../../helpers/hooks'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import getTextarea from '../../helpers/getTextarea';
import { setCurrentCanvasTextStyle } from '../../../store/reducers/commonReducer';



function Color() {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const currentCanvasTextStyle = useAppSelector(state => state.commons.currentCanvasTextStyle)

    const handleTooltipClose = (e:any) => {
        setOpen(false);
      };
    
      const handleTooltipOpen = () => {
        setOpen(true);
      };

    const handleChange = (color:any) => {
        const textarea = getTextarea()
        if (textarea !== null) {
            textarea.style.color = color.hex
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, color: color.hex}))

        }
      };

  return (
    <Tooltip
    PopperProps={{
      disablePortal: true,
    }}
    onClose={handleTooltipClose}
    open={open}
    disableFocusListener
    disableHoverListener
    disableTouchListener
    title={
        <React.Fragment>
            <IconButton style={{float:"right"}} onClick={handleTooltipClose}>
            <CloseIcon />
            </IconButton>
          <SketchPicker 
          color={currentCanvasTextStyle.color}
          onChange={handleChange}
          />
        </React.Fragment>
      }
  >
    <IconButton onClick={handleTooltipOpen} style={{color: currentCanvasTextStyle.color}}>
        <FormatColorTextIcon/>
    </IconButton>
  </Tooltip>
  )
}

export default Color