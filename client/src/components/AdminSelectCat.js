import React, {useState} from 'react'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import CatForm from '../forms/CatForm';
import useCategories from '../hooks/useCategories';
import Error from './Error';

// const categories=[{id:1, name:'Sour'},{id:2,name:'Gummy'}, {id:3, name:'Chocolate'}] 

export default function AdminSelectCat() {

    const [cat, setCat] =useState('')
    const {categories, error}=useCategories()

    const handleChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value === 'default'){
            console.log('No Cat selected')
            setCat('')
        }else {
            console.log('in else') 
            // look up cat with that id and thats the cat we want to edit
            const newcat=categories.filter((c)=>c.id===event.target.value)[0]
            console.log(newcat,'selected')

            setCat(newcat)
        }

    }

  return (
      <>
        <FormControl fullWidth>
                <InputLabel id="category-label-id">Category</InputLabel>
                <Select
                labelId="category-label-id"
                id="category-id"
                name="category_id"
                value={cat ? cat.id : 'default'}
                placeholder="Category"
                label="Category"
                onChange={(event)=>handleChange(event)}
                >
                    <MenuItem value="default"><em>Select Category To Edit</em></MenuItem>

                    {categories?.map((cat1)=>(
                        <MenuItem key={cat1.id} value={cat1.id}>{cat1.name}</MenuItem>
                    ))}
                </Select>
                <Error>{error}</Error>
        </FormControl>

        {
            cat?
            <>
                <Typography sx={{p:4}} variant="h5">
                    Edit {cat.name}
                </Typography>
                <CatForm category={cat}/>
            </>
            :
            <>
                <Typography sx={{p:4}} variant="h5">
                    Create
                </Typography>
                <CatForm/>
            </>
        }
      </>
  )
}
