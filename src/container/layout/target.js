import React from 'react';
import { Tree, Row, Col, Typography,Spin, Descriptions, Form,Tabs, Radio, Button, Divider, Input, Icon, message } from 'antd';
import TargetNode from '../from/targetNode';
import Axios from 'axios';
import { withRouter } from 'react-router-dom'
const { Title, Paragraph } = Typography;
const { TreeNode } = Tree;
const { TabPane } = Tabs
@withRouter
class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onloding:false,
            str: '非常满意',
            thisindex:'1',
            treeData: [//指标树
            ],
            showData:{
                "name": "指标管理",
                "weight": "0",
                "pid": 0,
                "id": 1,
                "sort": 1,
                "option": [
                  {
                    "id": 1,
                    "name": "非常满意",
                    "fraction": 5
                  },
                  {
                    "id": 2,
                    "name": "满意",
                    "fraction": 3
                  }
                ]
              }
        }
    }
    componentDidMount(){
        this.onDragEnter()
        this.fetch()
    }
    fetch=()=>{
        Axios({
            url:'/selectIndex',
            method:'post',
            type:'json'
        }).then(res=>{
            if(res.data.status===1){
                this.setState({
                    treeData:res.data.data
                })
            }
        })

    }
    handledelete=()=>{
        Axios({
            url:'/deleteIndex',
            method:'post',
            type:'json',
            params:{
                id:this.state.thisindex
            }
        }).then(res=>{
            if(res.data===1){
                message.success('删除成功')
                this.fetch()
                this.onDragEnter()
            }else{
                message.warning('删除失败')
            }
        })
    }

    onDragEnter = (info=1)=> {
        this.setState({onloding:true})
        Axios({
            url:'/selectIndexOption',
            method:'get',
            type:'json',
            params:{
                id:info
            }
        }).then(res=>{
            this.setState({onloding:false})
                this.setState({
                    showData:res.data,
                    thisindex:info,
                })
        })
    };
    handleonSelect=(info)=>{
        this.onDragEnter(info[0])
    }
    onChange = (str,title) => {
        let  data= Object.assign({}, this.state.showData, { [title]: str })
        
        Axios({
            url:'/updateIndex1',
            method:'post',
            type:'json',
            data:{
                ...data
            }
        }).then(()=>{
            message.success('修改成功')
        })
        this.setState({showData:data})
    };
    onChangeitem = (str,id) => {
        let listdata=[...this.state.showData.option]
        this.setState({
            showData:{option:listdata.map(v=>v.id===id?{...v,name:str}:v),...listdata}
        })
    };
    render() {
        let i=0
        // 生成树节点
        const loop = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode key={item.key} title={item.title}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} title={item.title} />;
            });
        return (
            <Row >
                <Col span={5} style={{ padding: 24, background: '#fff', marginTop: 32 }}>
                    <Row>
                        <Col span={24}>
                            <Title level={4}>指标树</Title>
                            <Divider />
                            <Tree
                                className="draggable-tree"
                                defaultExpandedKeys={this.state.expandedKeys}
                                onSelect={this.handleonSelect}
                            >
                                {loop(this.state.treeData)}
                            </Tree>
                        </Col>
                        <Col span={24}>

                        </Col>
                    </Row>
                </Col>
                <Col offset={1} span={18} style={{ padding: 24, background: '#fff', marginTop: 32 }}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="指标信息" key="1" >
                        <Spin size="large" spinning={this.state.onloding} >
                        <Row>
                        <Col span={24} >
                            <Button type="link " onClick={this.handledelete} style={{ marginLeft: 5, float: 'right' }}>删除指标</Button>
                            <Descriptions title="基本信息" bordered>
                                <Descriptions.Item label="当前指标"><Paragraph  editable={{ onChange:(str)=>{this.onChange(str,"name")}}}>{this.state.showData.name}</Paragraph></Descriptions.Item>
                               <Descriptions.Item  label="指标权重"><Paragraph  editable={{ onChange:(str)=>{this.onChange(str,"weight")}}}>{this.state.showData.weight}</Paragraph></Descriptions.Item>
                            </Descriptions>
                            <Descriptions column={1} title="选项" bordered>
                                {   
                                    this.state.showData.option.map(v=>{
                                        i++
                                   return <Descriptions.Item key={v.id}  label={`选项${i}`}><Paragraph  editable={{ onChange:(str)=>{this.onChangeitem(str,v.id)}}}>{v.name}</Paragraph></Descriptions.Item>   
                               })}                        
                            </Descriptions>
                        </Col>
                     </Row>
                     </Spin>
                        </TabPane>
                        <TabPane tab="指标管理" key="2">
                        <Row>
                        <Col span={24}>
                        <TargetNode id={this.state.showData.id} pid={this.state.showData.pid}></TargetNode>
                        </Col>
                    </Row>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

export default Index