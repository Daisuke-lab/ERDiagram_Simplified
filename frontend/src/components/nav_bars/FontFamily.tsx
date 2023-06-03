import React, { useEffect, useRef, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { TextareaAutosize } from '@mui/material';
import getTextarea from '../../helpers/getTextarea';
import { setCurrentCanvasTextStyle } from '../../../store/reducers/commonReducer';


function FontFamily() {
    const dispatch = useAppDispatch()
    const selectRef = useRef<typeof Select>()
    const currentCanvasTextStyle = useAppSelector(state => state.commons.currentCanvasTextStyle)





    const handleClose = () => {
      const menuItems = document.getElementsByClassName("font-mamily-item")
      for (const menuItem of menuItems) {
        console.log(menuItem)
        menuItem.setAttribute("disableMouseEnter", false)
      }
    }


    const handleChange = (event: SelectChangeEvent) => {
        console.log("handleChange")
        console.log(event)
        // handleMouseOver can be triggered even after handleChange, thus disable it by attribute.
        const menuItems = document.getElementsByClassName("font-mamily-item")
        for (const menuItem of menuItems) {
          menuItem.setAttribute("disableMouseEnter", true)
          //menuItem.addEventListener("mouseenter", function() { return; })
        }
        const textarea = getTextarea()
        if (textarea !== null) {
            textarea.style.fontFamily = event.target.value
        }
    };

    const handleMouseOver = (e:any, fontFamily:string) => {
        console.log("handleMouseOver")
        const disableMouseEnter = e.target.getAttribute("disableMouseEnter")
        console.log({disableMouseEnter})
        const textarea = getTextarea()
        if (textarea !== null && disableMouseEnter !== "true") {
            textarea.style.fontFamily = fontFamily
            dispatch(setCurrentCanvasTextStyle({...currentCanvasTextStyle, fontFamily: textarea?.style.fontFamily}))
        }
    }




    

  return (
    <FormControl variant="standard" sx={{ m: 0.5, minWidth: 30 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="font-family-select"
          defaultValue={currentCanvasTextStyle.fontFamily?? "Caribri"}
          onChange={handleChange}
          ref={selectRef}
          label="font"
        >
            <MenuItem value="Arial" onMouseEnter={(e) => handleMouseOver(e,"Arial")} className="font-mamily-item">Arial</MenuItem>
          <MenuItem value="Caribri" onMouseEnter={(e) => handleMouseOver(e,"Caribri")} className="font-mamily-item">Caribri</MenuItem>
          <MenuItem value="cursive" onMouseEnter={(e) => handleMouseOver(e,"cursive")} className="font-mamily-item">Cursive</MenuItem>
          <MenuItem value="fangsong" onMouseEnter={(e) => handleMouseOver(e,"fangsong")} className="font-mamily-item">Fangsong</MenuItem>
          <MenuItem value="fantasy" onMouseEnter={(e) => handleMouseOver(e,"fantasy")} className="font-mamily-item">Fantasy</MenuItem>
          <MenuItem value="monospace" onMouseEnter={(e) => handleMouseOver(e,"monospace")} className="font-mamily-item">Monospace</MenuItem>
          <MenuItem value="serif" onMouseEnter={(e) => handleMouseOver(e,"serif")} className="font-mamily-item">Serif</MenuItem>
        </Select>
      </FormControl>
  )
}

export default FontFamily