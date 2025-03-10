const initialState ={
    allIteams : [],
}

export default function iteamsReducer ( state = initialState, action){
    console.log(action.payload,'ITEamreducer',state.allIteams)

    switch(action.type){

        case "ADD_ALL_ITEAMS" : {
            return {...state, allIteams : [...action.payload] }
        }
        case "ADD_ITEAM":{
            return {...state, allIteams: [...state.allIteams, action.payload]}
        }
        case 'EDIT_ITEAM': {
            // console.log(state.allIteams.map((ele)=>{
            //     if(ele._id === action.payload._id){
            //         console.log('id',ele._id)
            //     }
            // }))
            return {
                ...state,
                allIteams: state.allIteams.map((ele) =>{
                    if(ele._id === action.payload._id){
                        //console.log('if',ele._id)
                        return { ...ele, ...action.payload }
                        
                    }else{
                      return  {...ele} 
                    } 
                }),
            };
        }
        
        
        
        case 'PRODUCT_DELETE':{
            return {...state, allIteams: state.allIteams.filter(ele => ele._id != action.payload)}
        }
        default : {
            return {
                ...state
            }
        }
    }
}