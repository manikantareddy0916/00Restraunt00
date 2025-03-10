import axios from "../config/axios"
// export const startCartIteam = ()=>{
//     return async (dispatch) =>{
//         try{
//             console.log('di',dispat)
            
//             dispatch(addAllIteams(data))
//           }
//           catch(e){
//             console.log('err',e)
//           }
//     }
// }
// export const addToCart =({iteamId, updatedIteam})=>{
//     return async (dispatch)=>{
       
//         try{
//             console.log(updatedIteam,'ACTION PRODUCT11',iteamId)
//             const response = await axios.post(`/api/addcart/${iteamId}`,updatedIteam,{
//                 headers:{
//                     'Authorization' : localStorage.getItem('token')
//                 }
//             })
//             // getting user Data
//             console.log('RES.DATA',response.data,'updated',updatedIteam)
//             dispatch(addCart(response.data))

            
//         }catch(e){
//             console.log('ee',e)
//             //dispatch(serverErrors(e.response.data.errors))
//         }
//     }

    
// }
// const addCart = (ite)=>{
//     return {
//         type: 'ADD_CART', 
//         payload: ite
//     }
// }
// return{
//     type :"CART_ITEAMS",
//     payload : pro
// }
// export const addAllCartIteam =( data)=>{
//     return {
//         type : "CART_ALL_ITEAMS",
//         payload : data
//     }
// }