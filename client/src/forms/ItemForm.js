import React, {useState} from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import Button from '../components/Button'
import { FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import useCategories from '../hooks/useCategories'
import useCreate from '../hooks/useCreate'
import useDelete from '../hooks/useDelete'
import useEdit from '../hooks/useEdit'

const FormSchema = Yup.object(
    {
        name:Yup.string().required(),
        desc:Yup.string().required(),
        price:Yup.string().matches(/^\d+(\.\d{1,2})?$/).required(),
        img:Yup.string().url().required(),
        category_id:Yup.number().integer().required()
        
    }
)


// const item={
//     "id":2,
//     "name":"itemB",
//     "desc":"itemB is good",
//     "price":12.99,
//     "img":"https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
//     "category_id":1,
//     "category_name":'Sour'
//   }

// const categories=[{id:1, name:'Sour'},{id:2,name:'Gummy'}, {id:3, name:'Chocolate'}] 

export default function ItemForm({item}) {


    const{categories, error}=useCategories()

    const [newItem, setNewItem] = useState()
    const [delItem, setDelItem] = useState()
    const [editItem, setEditItem] = useState()
    useCreate(newItem)
    useDelete(delItem)
    useEdit(item?.id, editItem)



    const initialValues={
        name:item?.name ?? '',
        desc: item?.desc ??'',
        price:item?.price ?? '', 
        img:item?.img ?? '',
        category_id:item?.category_id ?? 0,
    
    }
    const handleSubmit=(values, resetForm)=>{
        if (item){
            setEditItem(values)
            console.log("editing", values)
        }else{
            setNewItem(values)
            console.log("creating", values)
        }
        resetForm(initialValues)
    }

    const handleDelete=()=>{
        setDelItem(item)
        console.log('deleting item: ', item.name )
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, {resetForm})=> handleSubmit(values, resetForm),
        enableReinitialize: true,
    })
    

  return (
<form onSubmit={formik.handleSubmit}>
        <TextField
            id ="name"
            name="name"
            fullWidth
            sx={{mb: 2, mt:2}}
            label="Name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error = {formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
            id ="desc"
            name="desc"
            fullWidth
            sx={{mb: 2, mt:2}}
            label="Description"
            placeholder="Description"
            value={formik.values.desc}
            onChange={formik.handleChange}
            error = {formik.touched.desc && Boolean(formik.errors.desc)}
            helperText={formik.touched.desc && formik.errors.desc}
        />
        <TextField
            id ="price"
            name="price"
            fullWidth
            sx={{mb: 2, mt:2}}
            label="Price"
            placeholder="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error = {formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
            id ="img"
            name="img"
            fullWidth
            sx={{mb: 2, mt:2}}
            label="Image URL"
            placeholder="Image URL"
            value={formik.values.img}
            onChange={formik.handleChange}
            error = {formik.touched.img && Boolean(formik.errors.img)}
            helperText={formik.touched.img && formik.errors.img}
        />
        <FormControl fullWidth>
            <InputLabel id="category-label-id">Category</InputLabel>
            <Select
            labelId="category-label-id"
            id="category-id"
            name="category_id"
            value={formik.values.category_id}
            palceholder="Category"
            label="Category"
            onChange={formik.handleChange}
            error = {formik.touched.category_id && Boolean(formik.errors.category_id)}
            >
                <MenuItem value={0}><em>None</em></MenuItem>

                {categories?.map((cat)=>(
                    <MenuItem key={cat.id} value={cat.id}>{cat.name} | {cat.id}</MenuItem>
                ))}

            </Select>
            <FormHelperText>{formik.touched.category_id && formik.errors.category_id}</FormHelperText>
        </FormControl>

        <Button type="submit" sx={{ width:"100%", my:1}}>{item?"Edit Item": "Create Item"}</Button>
        { item ? 
        <Button color="error" onClick={()=>handleDelete()}sx={{ width:"100%"}}>
            Delete
        </Button>
        : ''}
    </form>
  )
}
