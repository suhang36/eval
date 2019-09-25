import Axios from "axios";

/**
 * 处理用户有关的state树操作，登陆，注销
 */

const ADD_ROLE='ADD_ROLE'
// initstate
const initstate={
}

//rudecr
export function role (state = initstate,action){
    switch(action.type){
        case ADD_ROLE:
            return {...state,role:action.payload};
        default:
            return state
    }
}

//action
function addrole(data){
    return {type:ADD_ROLE,payload:data}
}
export function getrole(){
        return dispatch =>{
            Axios({
                method:'post',
                url:'/getRole',
                responseType:'json',
              })
            .then(res =>{
                
                dispatch(addrole(res.data))
            }
            )
        }
}

