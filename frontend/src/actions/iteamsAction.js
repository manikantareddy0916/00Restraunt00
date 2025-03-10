import axios from "../config/axios"

export const startAllIteams = ()=>{
    return async (dispatch) =>{
        try{
            const response = await axios.get('/api/iteams/all')
            //console.log('data',response.data)
            const data = response.data
            
            dispatch(addAllIteams(data))
          }
          catch(e){
            console.log('err',e)
          }
    }
}
const addAllIteams =(pro)=>{
    return{
        type :"ADD_ALL_ITEAMS",
        payload : pro
    }
}

//create
export const startAddIteam=({formData, navigate})=>{
    return async (dispatch)=>{
       
        try{
            console.log('ACTION additeam',formData)
            const response = await axios.post('/api/iteams/add',formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : localStorage.getItem('token')
                }
            })
            // console.log('ACTION PRODUCT22',formData)
            console.log('RES.DATA',response.data)
            dispatch(addIteam(response.data.iteam))
            navigate('/')
        }catch(e){
            console.log('ee',e)
        }
    }
}

//update
const addIteam = (iteam) =>{
    return {
        type : "ADD_ITEAM",
        payload : iteam
    }
}
export const sEditIteam =({formData,pId, navigate})=>{
    return async (dispatch)=>{
       
        try{
            console.log('2ACTIONqwertyuio',formData,pId)
            const response = await axios.put(`/api/iteams/edit/${pId}`,formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : localStorage.getItem('token')
                }
            })
            // console.log('ACTION PRODUCT22',formData)
            console.log('RES.DATA',response.data.product)
            dispatch(editIteam(response.data.product))
            navigate('/')
        }catch(e){
            console.log('ee',e)
        }
    }
}
const editIteam =(id)=>{
    return {
        type : 'EDIT_ITEAM',
        payload : id
    }
}


//delete
export const startDeleteItm =({pId})=>{
    return async (dispatch)=>{
        try{
            const resp = await axios.delete(`api/iteams/delete/${pId}`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('djf',resp.data)
            dispatch(iteamDelete(resp.data._id))
        }
        catch(e){
            console.log('error',e)
        }
    }
}
const iteamDelete =(id)=>{
    return {
        type : 'PRODUCT_DELETE',
        payload : id
    }
}
