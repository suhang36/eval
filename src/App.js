import React from 'react';
import {Route} from 'react-router-dom'

import Login from './container/login'
import Game from './container/test'
import IndexLayout from './container/layout'

// 业务主入口
// 路由的匹配
class App extends React.Component{
  render(){
    return (
      <div>
      <Route path="/Login" component={Login}></Route>
      <Route path="/Demo" component={Game}></Route>
      <Route path='/Index' component={IndexLayout}></Route>
      </div>
    )
  }
}

export default App;
