import React, { useContext } from 'react'
import {useTheme} from '@mui/material/styles'
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { AppContext } from '../../context/AppContext'

const range = (x) => [...Array(x).keys()]

export default function ChangeCartItemQuantity({item, qty}) {
  const theme = useTheme()
  const {removeAllFromCart, addBulkToCart} = useContext(AppContext)


  const handleChange=(event)=>{
    removeAllFromCart(item)
    addBulkToCart(Array(event.target.value).fill(item))
    console.log("qty changed", event.target.value)
  }

  return (
    <FormControl fullWidth sx={{backgroundColor:theme.palette.background.default}}>
      <InputLabel id="qty-sel">Qty {qty}</InputLabel>
      <Select
        labelId="qty-sel"
        id="qty-sel-sel"
        value={qty}
        onChange={event=>handleChange(event)}
      >
        {range(qty+100).map(
          (qtySel)=>qtySel <= qty || qtySel <10 || qtySel%10===0 || qtySel%25===0
          ?
          <MenuItem key={qtySel} value={qtySel}>{qtySel}</MenuItem>
          :
          ''
        )
        }
      </Select>

    </FormControl>
  )
}
