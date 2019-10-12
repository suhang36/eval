import React from 'react'
import {Typography,Radio,Input,Divider} from 'antd';

class Option extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: 1
        }
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    render(){
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return (
            <div>
                <Divider />
                <div style={{padding:20}}>
                    <Typography style={{fontSize:16,fontWeight:"bold"}}>{this.props.problem.id}.{this.props.problem.title} </Typography>
                    <Radio.Group onChange={(v)=>{this.props.onchange(this.props.problem.id,v)}} size={"small"} style={{margin:20}}>
                        {this.props.problem.option.map(v=>{
                            return (<Radio style={radioStyle} value={v.id} key={v.id}>
                                {v.title}
                                </Radio>)
                            })}
                    </Radio.Group>
                </div>
            </div>
        )
    }
}
export default Option