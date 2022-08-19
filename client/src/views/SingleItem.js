import React, {useContext} from 'react'
import Item from '../components/Item'
import { Typography, Box } from '@mui/material'
import { AppContext } from '../context/AppContext'

export default function SingleItem() {
 

  return (
    <>
    
      <Box sx={{maxWidth:"75%", mx:"auto"}}>
        <Item/>
      </Box>  
    </>
  )
}
