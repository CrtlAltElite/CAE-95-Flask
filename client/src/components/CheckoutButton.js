import React, {useState, useEffect, useContext} from 'react'
import Button from './Button'
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import postTransaction from '../api/apiStripe'
import {CancelToken} from 'apisauce'
import { AppContext } from '../context/AppContext'

export default function CheckoutButton() {
    const [checkoutInfo, setCheckoutInfo]=useState()
    const {cart, user} = useContext(AppContext)

    useEffect(
        ()=>{
            let source
            const makeSale=async()=>{
                source = CancelToken.source()
                if(checkoutInfo){
                    await postTransaction(user.token, checkoutInfo, source.token)
                }
            }
            makeSale()
            return ()=>{source.cancel()}
        },
        [checkoutInfo, user.token]
    )


  return (
    <Button onClick={()=>{setCheckoutInfo({cart, user})}}startIcon={<PointOfSaleTwoToneIcon/>}>Checkout</Button>
  )
}
