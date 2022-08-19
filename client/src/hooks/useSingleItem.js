

import React, {useEffect, useState} from 'react'
import apiItem from '../api/apiItem';
import { CancelToken } from 'apisauce';

export default function useItems(id) {
    const [response, setResponse]=useState('')

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const apiCall=async ()=>{
                const r = await apiItem.getItem(id, source.token)
                setResponse(r)
            }
          
            if(id) {apiCall()}
            return ()=>{source.cancel()}
        }
    ,[id])
  return response
}
