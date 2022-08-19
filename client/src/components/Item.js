import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import  Avatar  from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {useParams} from 'react-router-dom';
import useSingleItem from '../hooks/useSingleItem';
import { Box } from '@mui/system';
import Error from './Error';
import { CircularProgress } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MyItem() {
  const {itemId} = useParams();
  
  
  const {item, error} = useSingleItem(itemId)
  
  if (!item){
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

      <Grid container spacing={1} sx={{m:1, pr:2, border:'1px solid', borderRadius:1}}>
        <Grid item sm={12} xs={12}  md={12}>
          <Item sx={{display:"flex", justifyContent: 'center'}}>
             <Avatar src={item.img} alt={item.name} sx={{height:'30%', width:'30%'}} variant="rounded"/>
          </Item>
        </Grid>
        <Grid item sm={12} xs={12}  md={12}>
          <Item sx={{height:'100%', alignContent: 'center'}}>
              <Typography variant="subtitle1"><strong>Item Name:</strong></Typography>
              <Typography variant="body1">{item.name}</Typography>
          </Item>
        </Grid>

        <Grid item sm={6} xs={6} md={6}>
          <Item sx={{height:'100%'}}>
            <Typography variant="subtitle1"><strong>Price:</strong></Typography>
            <Typography variant="body1">{item.price}</Typography>
          </Item>
        </Grid>
        <Grid item sm={6} xs={6} md={6}>
          <Item sx={{height:'100%'}}>
            <Typography variant="subtitle1"><strong>Item ID:</strong></Typography>
            <Typography variant="body1">{item.id}</Typography>
          </Item>
        </Grid>
        <Grid item sm={12} xs={12}  md={12}>
        <Item sx={{height:'100%'}}>
            <Typography variant="subtitle1"><strong>Description:</strong></Typography>
            <Typography variant="body1">{item.desc}</Typography>
          </Item>
        </Grid>
        <Grid item sm={12} xs={12}  md={12}>
        <Item sx={{height:'100%'}}>
            <Typography variant="subtitle1"><strong>Category:</strong></Typography>
            <Typography variant="body1">{item.category_name}</Typography>
          </Item>
        </Grid>

      </Grid>

  );
}
