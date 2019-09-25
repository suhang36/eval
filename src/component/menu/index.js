import React from 'react'
import {Icon,Menu} from 'antd'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {getMenu,Gomenu} from '../../redux/user.redux'
// @withRouter可让非路由组件在内部像路由组件一样直接使用this.props.history.push()
@connect(
  state => state.user,
  {getMenu,Gomenu}
)
class Menus extends React.Component{
    
    handlGetMenu=(props)=>{
      this.props.getMenu(props)
    }  
    handlClick=(e)=>{
      // 获取path
      const res=this.props.menu.filter(menu=>{
        // eslint-disable-next-line
        return menu.id==e.key
      })
      const path=res[0].path
      if(!path){
        return
      }
      //处理path改为首字母大写，去除‘/’
      const menuname= path.split("/")[1].substring(0,1).toUpperCase()+path.split("/")[1].substring(1)
      //写入state树
      this.props.Gomenu(menuname)
    }
    render(){
      return (<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
      {this.props.menu?
        this.props.menu.map(menu=>
          <Menu.Item key={menu.id} onClick={this.handlClick}>
          <Icon type={menu.img} />
          <span>{menu.name}</span>
        </Menu.Item>
        ):
        sessionStorage.getItem('username')?this.handlGetMenu(sessionStorage.getItem('username')):
        <Redirect to='/Login'/>
        }
      </Menu>)
    }
}
export default Menus
 