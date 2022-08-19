import React, {useEffect, useContext} from 'react'
import { AppContext } from '../context/AppContext'
import { CancelToken } from 'apisauce'
import { getUser } from '../api/apiBasicAuth'
import {useNavigate} from 'react-router-dom'

export default function useLogin(loginCreds, setLoginCreds, setError) {
    const {setUser, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            const source = CancelToken.source()
            if(loginCreds.email && loginCreds.password){
                const login = async()=>{
                    const response = await getUser(loginCreds.email, loginCreds.password, source.token);
                    console.log(response)
                    if(response.user?.token){
                        console.log('logged in')
                        setUser(response.user)
                        setLoginCreds({})
                        setAlert({msg:'Thanks for logging in',cat:'success'})
                        navigate('/')
                    }
                    setError(response.error);
                }
                login()
            }
            return ()=>{source.cancel()}
        },
        [loginCreds, setLoginCreds, setError, setUser, setAlert, navigate]
    )
}
