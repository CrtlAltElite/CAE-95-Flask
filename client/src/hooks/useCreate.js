import {useEffect, useContext} from 'react'
import {CancelToken} from 'apisauce'
import apiCat from '../api/apiCategory'
import apiItem from '../api/apiItem'
import {useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


export default function useCreate(obj) {

    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()


    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            const apiCalls=async ()=>{
                if(obj.name && obj.desc){
                    //item
                    response = await apiItem.post(user?.token, obj, source.token)
                }else if(obj.name){
                    // cat
                    response = await apiCat.post(user?.token, obj, source.token)
                }

                if (!response?.error){
                    setAlert({msg: `${obj.name} Created`, cat:'success'})
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
