import {useEffect, useContext} from 'react'
import {CancelToken} from 'apisauce'
import apiCat from '../api/apiCategory'
import apiItem from '../api/apiItem'
import {useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


export default function useEdit(id, obj) {

    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()


    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            const apiCalls=async ()=>{
                if(id && obj.name && obj.desc){
                    //item
                    response = await apiItem.put(user?.token, id, obj, source.token)
                }else if(id && obj.name){
                    // cat
                    response = await apiCat.put(user?.token, id, obj, source.token)
                }

                if (!response?.error){
                    setAlert({msg: `${obj.name} Edited`, cat:'success'})
                }else if(response.error){
                    setAlert({msg:response.error, cat:'warning'})
                    navigate('/')
                }

            }
            if(obj){
               apiCalls()
            }
        return(()=>{source.cancel()})
        },[obj, user.token, setAlert, navigate]
    )
}
