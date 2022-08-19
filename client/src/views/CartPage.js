import React, {useContext, useEffect} from 'react'
import Cart from '../components/Cart/Index'
import { Typography, Box } from '@mui/material'
import { AppContext } from '../context/AppContext'
import {useParams} from 'react-router-dom';

export default function CartPage() {
 const {cart, setAlert} = useContext(AppContext)
 const {canceled} = useParams()
 
 
 useEffect(()=>{
   if(canceled){
     setAlert({msg:'Check out Canceled', cat:'error'})
   }
 },[canceled, setAlert])

 
 
 
 if(cart.length <= 0){
     return(
      <Typography variant='h3' sx={{ml:'20px'}}>
      Your Cart is Empty
    </Typography>
     )
 }


  return (
    <>
    
      <Box sx={{maxWidth:"75%", mx:"auto"}}>
        <Typography variant='h3' sx={{ml:'20px'}}>
          Your Cart  
        </Typography>
        <Cart/>
      </Box>  
    </>
  )
}
