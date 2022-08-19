import {apiClientTokenAuth} from './client'


const endpoint = '/api/create-checkout-session'

const postTransaction=async(token, data, cancelToken)=>{
    const response=await apiClientTokenAuth(token, cancelToken).post(endpoint, data);
    return window.location.href = response.data.url

}

export default postTransaction