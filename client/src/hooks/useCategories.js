

import React, {useEffect, useState} from 'react'
import apiCat from '../api/apiCategory';
import { CancelToken } from 'apisauce';

export default function useCategories() {
    const [response, setResponse]=useState('')

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const apiCall=async ()=>{
                const r = await apiCat.get(source.token)
                setResponse(r)
            }
            apiCall()
            return ()=>{source.cancel()}
        }
    ,[])
  return response
}
