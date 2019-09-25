import React from 'react';
import {connect} from 'react-redux'
import Useradmini from '../userManger/userManger'
@connect(state => state.user)

class Main extends React.Component{
    render(){
        switch(this.props.onmenu){
            case "Useradmini":
                return <Useradmini></Useradmini>
            default:
                return <Useradmini></Useradmini>
        }
    }
}
export default Main