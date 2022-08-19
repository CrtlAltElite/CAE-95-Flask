import React from 'react'
import AdminSelectCat from '../components/AdminSelectCat'
import {  Paper } from '@mui/material'
import {useTheme} from '@mui/material/styles'

export default function AdminCategory() {
    const theme = useTheme()

  return (
    <Paper sx={{m:5, 
        p:5, 
        justifyContent:"center", 
        backgroundColor: theme.palette.background.paper, 
        backgroundImage: theme.palette.background.paper,
        maxWidth:"1000px",
        mx:"auto"
    }}>
        <AdminSelectCat/>
    </Paper>
  )
}
