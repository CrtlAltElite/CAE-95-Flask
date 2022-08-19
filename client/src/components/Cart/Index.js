import React, { useContext } from 'react'
import CartItem from './CartItem'
import Box from '@mui/material/Box'
import { AppContext } from '../../context/AppContext'
import CheckoutBar from './CheckoutBar'


export default function Index() {
  const {cart} = useContext(AppContext)

  return (
   <>
    <Box sx={{mb:15}}>
        {
            [...new Set(cart?.map(JSON.stringify))]?.map(JSON.parse)?.map(
                (item)=><CartItem key={item.id} item={item}/>
            )
        }
    </Box>
    <CheckoutBar/>
   </>


  )
}
