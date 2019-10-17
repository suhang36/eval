import React from 'react';
import {connect} from 'react-redux'
import Useradmini from '../userManger/userManger'
import CU from '../layout/Class.user'
import CT from '../layout/Class.Teacher'
import Index from '../layout/target';
import Paper from '../layout/paper';
import Pjteacher from '../student/pjteacher/pjteacher';
import DataPager from '../teacher/DataPager';
import Pjresult from '../layout/pjresult';
import Pjmyself from '../teacher/pjmyself';
import Pjyourself from '../teacher/pjyourself';
@connect(state => state.user)

class Main extends React.Component{
    render(){
        switch(this.props.onmenu){
            case "Useradmini":
                return <Useradmini></Useradmini>
            case "CU":
                return <CU></CU>
            case "CT":
                return <CT></CT>
            case "Index":
                return <Index></Index>
            case "Paper":
                return <Paper></Paper>
            case "Pjteacher":
                return <Pjteacher></Pjteacher>
            case "DataPager":
                return <DataPager></DataPager>
            case "PjResult":
                return <Pjresult></Pjresult>
            case "Pjmyself":
                return <Pjmyself></Pjmyself>
            case "Pjyourself":
                return <Pjyourself></Pjyourself>
            default:
                return <div></div>
        }
    }
}
export default Main