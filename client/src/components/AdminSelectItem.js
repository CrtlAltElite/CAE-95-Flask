import React, {useState} from 'react'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import ItemForm from '../forms/ItemForm';
import useItems from '../hooks/useItems';
import Error from './Error';


// const items=[{
//     "id":2,
//     "name":"itemB",
//     "desc":"itemB is good",
//     "price":12.99,
//     "img":"https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
//     "category_id":1,
//     "category_name":'Sour'
//   },{
//     "id":1,
//     "name":"itemA",
//     "desc":"itemA is good",
//     "price":9.99,
//     "img":"https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
//     "category_id":2,
//     "category_name":'Gummy'
//   }

// ]
export default function AdminSelectItem() {

    const [item, setItem] =useState('')
    const {items, error} = useItems()
    const handleChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value === 'default'){
            console.log('No Item selected')
            setItem('')
        }else {
            console.log('in else') 
            // look up cat with that id and thats the cat we want to edit
            const newItem=items?.filter((i)=>i.id===event.target.value)[0]
            console.log(newItem,'selected')

            setItem(newItem)
        }

    }

  return (
      <>
        <FormControl fullWidth>
                <InputLabel id="item-label-id">Item</InputLabel>
                <Select
                labelId="item-label-id"
                id="item-id"
                name="item_id"
                value={item ? item.id : 'default'}
                placeholder="Item"
                label="Item"
                onChange={(event)=>handleChange(event)}
                >
                    <MenuItem value="default"><em>Select Item To Edit</em></MenuItem>

                    {items?.map((i)=>(
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                    ))}
                </Select>
                <Error>{error}</Error>
        </FormControl>

        {
            item?
            <>
                <Typography sx={{p:4}} variant="h5">
                    Edit {item.name}
                </Typography>
                <ItemForm item={item}/>
            </>
            :
            <>
                <Typography sx={{p:4}} variant="h5">
                    Create
                </Typography>
                <ItemForm/>
            </>
        }
      </>
  )
}
