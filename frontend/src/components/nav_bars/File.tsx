import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from "../../../styles/Navbar.module.css"
import { useAppSelector } from '../../helpers/hooks';
import { CustomSessionType } from '../../../types/CustomSessionType';
import getAxios from '../../helpers/getAxios';
import { useSession } from 'next-auth/react';

function File() {
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const currentRoom  = useAppSelector(state => state.commons.currentRoom)
  const open = Boolean(anchorEl);
  const { data: session } = useSession()
  const axios = getAxios(session as CustomSessionType | null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseOver = (e:React.MouseEvent) => {
  }

  
  const onDuplicate = async () => {
    try {
      const res = await axios.post(`/api/v1/room/duplicate/${currentRoom?.id}`)
      const url = `/rooms/${res.data.id}`
      window.open(url, '_blank')?.focus();
    } catch(err) {
      console.log(err)
    }
  }

  const onExport = () => {
    const canvas = document.getElementsByTagName("canvas")[2]
    var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);

    // create a blob object representing the data as a JSON string
    var file = new Blob([string], {
      type: 'application/json'
    });
    
    // trigger a click event on an <a> tag to open the file explorer
    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <>
    <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={styles.navButton}
      >
        File
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>New</MenuItem>
        <MenuItem onClick={handleClose}>Save</MenuItem>
        <MenuItem onClick={onDuplicate}>Duplicate</MenuItem>
        <MenuItem onClick={handleClose}>Assign Status</MenuItem>
        <MenuItem onClick={handleClose}>Import</MenuItem>
        <MenuItem onClick={onExport}>Export</MenuItem>
      </Menu>
    </>
  )
}

export default File