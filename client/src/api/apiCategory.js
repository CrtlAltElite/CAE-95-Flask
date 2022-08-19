import { apiClientNoAuth, apiClientTokenAuth } from "./client.js";

const endpoint = '/api/category'

const get = async (cancelToken) =>{
    let error
    let categories

    const response = await apiClientNoAuth(cancelToken).get(endpoint)
    if (response.ok){
        categories = response.data.categories
    }else{
        error = "An Unexpected Error Occurred.  Please Try Again Later"  
    }
    return {
        error,
        categories
    }
}


const post = async (token, cat, cancelToken) =>{
    let error
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, {name: cat.name})
    if (!response.status || response.status>500 ){
        error = "An Unexpected Error Occurred.  Please Try Again Later"  
    }
    else if (response.status && response.status<500 && response.status>299){
        error = "Please reauthorize you account"  

    }
    return {
        error
    }
}

const put = async (token, id, cat, cancelToken) =>{
    let error
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+'/'+id, cat)
    if (!response.status || response.status>500 ){
        error = "An Unexpected Error Occurred.  Please Try Again Later"  
    }
    else if (response.status && response.status<500  && response.status>299){
        error = "Please reauthorize you account"  

    }
}

const del = async (token, id, cancelToken) =>{
    let error
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id)
    if (!response.status || response.status>500 ){
        error = "An Unexpected Error Occurred.  Please Try Again Later"  
    }
    else if (response.status<500  && response.status>299){
        error = "Please reauthorize you account"  

    }
}

const apiCategory={
    get,
    post,
    put,
    del
}

export default apiCategory
