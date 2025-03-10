import axios from "../config/axios"



//changing status in cart
export const startChangeStatus = ({userId,orderId,newStatus})=>{
    return async (dispatch) =>{
        try{
            console.log('newStatus',newStatus)
                const res = await axios.post(`/api/status/${userId}/${orderId}`,{newStatus}, {
                    headers: {
                       'Authorization': localStorage.getItem('token')
                    }
                  }) 
                //getting user data
                console.log('77777',res.data._id)
                dispatch(addStatusUser(res.data))
            
            
          }
          catch(e){
            console.log('err',e)
          }
    }
}
const addStatusUser =(pro)=>{
    return{
        type :"ADD_STATUS_USERS",
        payload : pro
    }
}
//get all users data
export const startAllUsers = ()=>{
    return async (dispatch) =>{
        try{
            if(localStorage.getItem('token')){
                const res = await axios.get('/api/allAccounts', {
                    headers: {
                       'Authorization': localStorage.getItem('token')
                    }
                  }) 
                // const response = await axios.get('/api/iteams/all')
                // //console.log('data',response.data)
                // const data = response.data
                console.log('j',res.data)
                dispatch(addAllUsers(res.data))
            }
            
          }
          catch(e){
            console.log('err',e)
          }
    }
}
const addAllUsers =(pro)=>{
    return{
        type :"ADD_ALL_USERS",
        payload : pro
    }
}
//user data
export const startUser = ()=>{
    return async (dispatch) =>{
        try{
            if(localStorage.getItem('token')){
                const res = await axios.get('/api/account', {
                    headers: {
                       'Authorization': localStorage.getItem('token')
                    }
                  }) 
                // const response = await axios.get('/api/iteams/all')
                // //console.log('data',response.data)
                console.log('j',res.data)
                dispatch(addUser(res.data))
            }
            
          }
          catch(e){
            console.log('err',e)
          }
    }
}
const addUser =(pro)=>{
    return{
        type :"ADD_USER",
        payload : pro
    }
}
//logout
export const startLogoutUser = () => {
    return async (dispatch) => {
        localStorage.removeItem("token");
        
        dispatch({
            type: "CLEAR_USER_DATA" 
        });
    };
    
};

//addcart to order
export const startCartOrder =({cartData,navigate})=>{
    return async (dispatch)=>{
        console.log('ACTION PRODUCT11')
        try{
            console.log('u')
                const response = await axios.post(`/api/users/orders`,cartData,{
                    headers:{
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                // getting user Data
                console.log('RES.DATA',response.data)
                dispatch(addUserCart(response.data))
                navigate('/')
            
        }catch(e){
            console.log('ee',e)
            //dispatch(serverErrors(e.response.data.errors))
        }
    }

    
}
//add cart
export const startUserCart =({pId, updateCartData, iteamId,updatedIteam})=>{
    return async (dispatch)=>{
        console.log(updatedIteam,'ACTION PRODUCT11',pId)
        try{
            if(pId && updateCartData){
                const response = await axios.post(`/api/addcart/${pId}`,updateCartData,{
                    headers:{
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                // getting user Data
                console.log('RES.DATA',response.data,'updated',pId)
                dispatch(addUserCart(response.data))
            }else{
                const response = await axios.post(`/api/addcart/${iteamId}`,updatedIteam,{
                    headers:{
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                // getting user Data
                console.log('RES.DATA',response.data,'updated',updatedIteam)
                dispatch(addUserCart(response.data))
            }
            

            
        }catch(e){
            console.log('ee',e)
            //dispatch(serverErrors(e.response.data.errors))
        }
    }

    
}
const addUserCart = (ite)=>{
    return {
        type: 'ADD_USER_CART', 
        payload: ite
    }
}
//updacrt cart
export const startUpdCrt =({pId})=>{
    return async (dispatch)=>{
        console.log('ACTION',pId)
        try{
                const response = await axios.post(`/api/remIteam/${pId}`,{},{
                    headers:{
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                // getting user Dataaa
                console.log('RES.DATA',response.data,'updated',pId)
                dispatch(addUserCart(response.data))

            
        }catch(e){
            console.log('ee',e)
            //dispatch(serverErrors(e.response.data.errors))
        }
    }

    
}
// const addUpdCrt = (ite)=>{
//     return {
//         type: 'ADD_USER_CART', 
//         payload: ite
//     }
// }

