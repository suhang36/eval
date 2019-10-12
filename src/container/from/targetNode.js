import React from 'react'
import { Radio,Typography} from 'antd';
import TargetAddFrom from './targetaddfrom';
import TargetAddFromFater from './targetaddfromfater';
const { Paragraph } = Typography;
class TargetNode extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isshow:'添加父级指标',
        }
    }
    handleChange=(info)=>{
        console.log(JSON.stringify(info,null,2))
        this.setState({isshow:info.target.value})
    }
    render() {
        const change = 
        <div>
            <Paragraph strong type="warning">添加的位置为当前选择的指标树节点（默认根节点）</Paragraph>
            <Paragraph>选择添加类型</Paragraph>
            <Radio.Group defaultValue={"添加父级指标"} onChange={this.handleChange}>
                <Radio value="添加父级指标">添加父级指标</Radio>
                <Radio value="添加题目指标">添加题目指标</Radio>
            </Radio.Group>
        </div>
        switch (this.state.isshow) {
            case "添加题目指标":
                return (<div>
                    {change}
                    <TargetAddFrom pid={this.props.pid}></TargetAddFrom>
                </div>)
                case "添加父级指标":
                        return <div>{change}
                         <TargetAddFromFater pid={this.props.pid}></TargetAddFromFater>
                         </div> 
            default:
                return <div>{ change }</div>
        }
    }
}
export default TargetNode