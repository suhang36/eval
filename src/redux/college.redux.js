import Axios from "axios";

/**
 * 处理用户有关的state树操作，登陆，注销
 */

const ADD_COLLEGE='ADD_COLELEGE'//添加学院
// initstate
const initstate={
    
}

//rudecr
export function college (state = initstate,action){
    switch(action.type){
        case ADD_COLLEGE:
            return {...state,college:action.payload};
        default:
            return state
    }
}

//action
function addcollege(data){
    return {type:ADD_COLLEGE,payload:data}
}
export function getcollege(){
        return dispatch =>{
            Axios({
                method:'post',
                url:'/getCollege',
                responseType:'json',
              })
            .then(res =>{
                dispatch(addcollege(res.data))
            }
            )
        }
}