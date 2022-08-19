import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { Box } from '@mui/system';
import Error from './Error';
import { CircularProgress } from '@mui/material';
import useCategories from '../hooks/useCategories';

export default function CategoryBar({actCat, setActCat}) {


    const {categories, error} = useCategories();

   const handleActCat = (cat) =>{
       if(actCat.id === cat.id){
           setActCat({})
       }else{
           setActCat(cat)
       }
   }

   
   if (!categories){
    return (
        <Box sx={{ display:"flex"}}>
            <CircularProgress/>
        </Box>
    )
} 
   if (error){
       return (
           <Box sx={{ display:"flex"}}>
               <Error>{error}</Error>
           </Box>
       )
   } 


  return (
    <Stack direction="row" spacing={1}>
     
    {categories.map((cat)=>(
        cat.id === actCat.id?
        <Chip onClick={()=>{handleActCat(cat)}} key={cat.id} variant="contained" size="small" label={cat.name} color="primary" />
        :
        <Chip onClick={()=>{handleActCat(cat)}} key={cat.id} variant="outlined" size="small" label={cat.name} color="primary" />
    )
    )}


    </Stack>
  )
}


