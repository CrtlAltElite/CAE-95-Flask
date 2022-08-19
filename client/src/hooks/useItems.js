

import React, {useEffect, useState} from 'react'
import apiItem from '../api/apiItem';
import { CancelToken } from 'apisauce';

export default function useItems(categoryID=null) {
    const [response, setResponse]=useState('')

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const apiCallAll=async ()=>{
                const r = await apiItem.get(source.token)
                setResponse(r)
            }
            const apiCallOne=async ()=>{
                const r = await apiItem.getByCat(categoryID, source.token)
                setResponse(r)
            }
            categoryID ? apiCallOne():apiCallAll()
            return ()=>{source.cancel()}
        }
    ,[categoryID])
  return response
}
