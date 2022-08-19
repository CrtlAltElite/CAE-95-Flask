import React, {useState} from 'react'
import CategoryBar from '../components/CategoryBar'
import { Typography, Box } from '@mui/material'
import ItemBrowser from '../components/ItemBrowser';

export default function Shop() {
    const [actCat, setActCat]=useState({});

  return (
    <>
    <Typography variant='h3'>Shop Our Wares</Typography>
    <Box sx={{minWidth:"300px", maxWidth:"1000px", display:"flex", justifyContent:"center",  mx:"auto" }}>
        <CategoryBar actCat={actCat} setActCat={setActCat}/>
    </Box>
    <Box sx={{minWidth:"300px", maxWidth:'1000px', display:"flex",  mx:"auto" }}>
        <ItemBrowser categoryID={actCat?.id}/>
    </Box>
    </>
  )
}
