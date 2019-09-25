import Axios from "axios";

/**
 * 处理用户有关的state树操作，登陆，注销
 */

 const LOGIN_IN='LOGIN_IN' //登陆
//  const LOGIN_OUT='LOGIN_OUT' //注销
const ERROR_MSG='ERROR_MSG'//错误消息
const ADD_MENU='ADD_MENU'//添加菜单
const CLICK_MENU='CLICK_MENU'//点击菜单
const ADD_SELECT='ADD_SELECT'//搜索框内容
// initstate
const initstate={
}

//rudecr
export function user (state = initstate,action){
    switch(action.type){
        case LOGIN_IN:
            return {...state,...action.payload};
        case ERROR_MSG:
            return {...state,msg:action.payload};
        case ADD_MENU:
            return {...state,menu:action.payload};
        case CLICK_MENU:
            return {...state,onmenu:action.payload};
        case ADD_SELECT:
            return {...state,select:action.payload};
        default:
            return state
    }
}

//action
function errormsg(msg){
    return {type:ERROR_MSG,payload:msg}
}
function clickMenu(menuname){
    return {type:CLICK_MENU,payload:menuname}
}
function adduser(obj){
    const {code,...data}=obj;
    return {type:LOGIN_IN,payload:data}
}

function addMenu(data){
    return {type:ADD_MENU,payload:data}
}

export function Gomenu(menuname){
    return dispatch=>{
        dispatch(clickMenu(menuname))
    }
}
export function addSelect(val){
    return {type:ADD_SELECT,payload:val}
}

export function getMenu(username){
        return dispatch =>{
            Axios({
                method:'post',
                url:'/getmenu',
                responseType:'json',
                params:{
                    "username":username
                }
              })
            .then(res =>{
                if(res.data.code===1){
                    dispatch(addMenu(res.data.menu))
                }
                
            }
            )
        }
}
export function getMenuAll(){
    return dispatch =>{
        Axios({
            method:'post',
            url:'/getmenuall',
            responseType:'json',
          })
        .then(res =>{
            if(res.data.code===1){
                dispatch(addMenu(res.data.menu))
            }
            
        }
        )
    }
}

export function login(password,username){
    if(!password||!username){
        return errormsg('请输入账号和密码');
    }
    return  dispatch =>{
        Axios({
            method:'post',
            url:'/login',
            params:{
                "password":password,
                "username":username
            }
          })
        .then(res => {
            if(res.data.code===1){
            const data=res.data
            data.username=username
            if(typeof(Storage) !=="undefined"){
                sessionStorage.setItem("username",username)
            }else{
                alert("您的游览器不支持Storage")
            }
            dispatch(adduser(data))
            //将用户名存入sessionStorge，表示已经登陆
            
            }else{
             dispatch(errormsg(res.data.mags))
            }
        })
    }
}


