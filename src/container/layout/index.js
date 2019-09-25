
import React from 'react'
import { Layout,Avatar,Button,Popover} from 'antd'
import Menus from '../../component/menu'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import Main from '../main/index'

const { Header, Content, Sider,Footer } = Layout;
@connect(state => state.user)
@withRouter
class IndexLayout extends React.Component{
  state = {
    collapsed: false,
  };
  
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  handlLogout=()=>{
      sessionStorage.removeItem('username')
      this.props.history.push('/login')
  }
  render() {
    
    const username = sessionStorage.getItem('username');
    const text = <p>用户信息</p>;
    const content = (
      <div>
        <p>{username}</p>
        <Button block onClick={this.handlLogout} >注销</Button>
      </div>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menus></Menus>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Popover placement="bottomRight" title={text} content={content} trigger="hover">
              <div className="userinfo">
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />  
              <span>{username}</span>            
              </div>
            </Popover>
          </Header>
          <Content style={{ margin: '0 16px'}}>
              {/* //主界面 */}
              <Main></Main>
          </Content>
          <Footer>
            这是页脚
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default IndexLayout