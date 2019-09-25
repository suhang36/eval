import React from 'react';
import LoginComponent from '../../component/login/login'
import {Row,Col,Alert} from 'antd';
import { connect } from 'react-redux';
import {login} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

// @withRouter可让非路由组件在内部像路由组件一样直接使用this.props.history.push()
@connect(
    state => state.user,
    {login}
  )
class Login extends React.Component{

    componentDidMount(){
        if(sessionStorage.getItem('username')){
            this.props.history.push('/index')
        }    
    }

    constructor(props){
        super(props)
        this.state={
                username:'',
                password:''
        }
        this.handlSubmit = this.handlSubmit.bind(this)
    }
    //处理用户输入
    handlChange =(e)=>{
        this.setState({
            [e.target.id] : e.target.value
        })  
    }
    //登陆
     handlSubmit(e){
        this.props.login(this.state.password,this.state.username)
        e.preventDefault()
    }
    render(){
        return (
            <div >
                <Row>
                {sessionStorage.getItem('username')?<Redirect to='/index'/>:
                <Col span={6} offset={9} className="login-form">
                    <h1 className="login-titile">教师评价系统</h1>
                    <LoginComponent  onchanges={this.handlChange} onSubmit={this.handlSubmit}></LoginComponent>
                    {this.props.msg?<Alert message={this.props.msg} type="error" />:null}
                </Col>}
                </Row>
            </div>
        )
    }
}




export default Login