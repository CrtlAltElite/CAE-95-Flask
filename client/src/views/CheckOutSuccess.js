import React, { useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function CheckOutSuccess() {
  const {emptyCart} = useContext(AppContext)


    useEffect(
        ()=>{emptyCart()}
        ,[emptyCart]
        )

  return (
    <div>
        Thanks for shopping with us today<br/>
        If we sent back info from our Flask App <br/>
        We could show it here.  Like an order Number and/or invoice
    </div>
  )
}
