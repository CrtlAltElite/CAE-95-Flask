import { Typography, Paper } from '@mui/material'
import React from 'react'
import LoginForm from '../forms/LoginForm'
import {useTheme} from '@mui/material/styles'

export default function Login() {

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
        <Typography variant="h4"> Login </Typography>
        <LoginForm/>
    </Paper>

  )
}
