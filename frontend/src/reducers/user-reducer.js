const initialState ={
    user : {}, allUsers: []
}

export default function userReducer ( state = initialState, action){
    console.log('Userreducer',state, action.payload)
    switch(action.type){

        case "ADD_STATUS_USERS":{
            return {...state, allUsers: state.allUsers.map((ele)=>{
                if(ele._id == action.payload._id){
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        case "ADD_ALL_USERS": {
            return { ...state, allUsers: [...action.payload] };
        }
        case "ADD_USER" : {
            return {...state, user : {...action.payload} }
        }
        case "ADD_USER_CART":{
            return {...state, user : {...action.payload}}
        }
        case "CLEAR_USER_DATA" :{
            return {...state, user:{}}
        }
        default : {
            return {
                ...state
            }
        }
    }
}