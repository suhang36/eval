import React from 'react';
import { Tree, Row, Col, Typography, Descriptions, Form,Tabs, Radio, Button, Divider, Input, Icon } from 'antd';
import TargetNode from '../from/targetNode';
const { Title, Paragraph } = Typography;
const { TreeNode } = Tree;
const { TabPane } = Tabs

class Index extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            str: '非常满意',
            treeData: [
                {
                    title: '指标管理',
                    key: '1',
                    children: [
                        {
                            title: '同行',
                            key: '2',
                            children: [
                                { title: '概念的讲解', key: '3' },
                                { title: '重点难点', key: '4' },
                                { title: '逻辑性和条理性', key: '5' },
                            ],
                        },
                        {
                            title: '0-0-1',
                            key: '0-0-1',
                            children: [
                                { title: '0-0-1-0', key: '0-0-1-0' },
                                { title: '0-0-1-1', key: '0-0-1-1' },
                                { title: '0-0-1-2', key: '0-0-1-2' },
                            ],
                        },
                        {
                            title: '0-0-2',
                            key: '0-0-2',
                        },
                    ],
                },
                {
                    title: '0-1',
                    key: '0-1',
                    children: [
                        { title: '0-1-0-0', key: '0-1-0-0' },
                        { title: '0-1-0-1', key: '0-1-0-1' },
                        { title: '0-1-0-2', key: '0-1-0-2' },
                    ],
                },
                {
                    title: '0-2',
                    key: '0-2',
                },
            ],
            showData:{
                name:"概念讲解",
                fatherName:"同行",
                sonName:"无",
                id:"1",
                weight:"0.1",
                option:[
                    {
                        id:1,
                        name:"非常满意"
                    },
                    {
                        id:2,
                        name:"满意"
                    },
                    {
                        id:3,
                        name:"不满意"
                    },
                    {
                        id:4,
                        name:"非常不满意"
                    }
                ]
            }
        }
    }
    onDragEnter = info => {
        console.log(info);
    };
    onChange = (str,title) => {
        console.log('Content change:', str);
        let data = Object.assign({}, this.state.showData, { [title]: str })
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
                                onSelect={this.onDragEnter}
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
                        <TabPane tab="指标信息" key="1">
                        <Row>
                        <Col span={24} >
                            <Button type="link " style={{ marginLeft: 5, float: 'right' }}>删除指标</Button>
                            <Descriptions title="基本信息" bordered>
                                <Descriptions.Item label="当前指标"><Paragraph  editable={{ onChange:(str)=>{this.onChange(str,"name")}}}>{this.state.showData.name}</Paragraph></Descriptions.Item>
                                <Descriptions.Item  label="父级指标"><Paragraph  editable={{ onChange:(str)=>{this.onChange(str,"fatherName")}}}>{this.state.showData.fatherName}</Paragraph></Descriptions.Item>
                                <Descriptions.Item  label="子级指标"><Paragraph  editable={{ onChange:(str)=>{this.onChange(str,"sonName")}}}>{this.state.showData.sonName}</Paragraph></Descriptions.Item>
                                <Descriptions.Item  label="指标权重"><Paragraph  editable={{ onChange:(str)=>{this.onChange(str,"weight")}}}>{this.state.showData.weight}</Paragraph></Descriptions.Item>
                                <Descriptions.Item  label="描述">
                                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions column={1} title="选项" bordered>
                                {   
                                    this.state.showData.option.map(v=>{
                                        i++
                                   return <Descriptions.Item  label={`选项${i}`}><Paragraph  editable={{ onChange:(str)=>{this.onChangeitem(str,v.id)}}}>{v.name}</Paragraph></Descriptions.Item>
                               })}                        
                            </Descriptions>
                        </Col>
                    </Row>
                        </TabPane>
                        <TabPane tab="指标管理" key="2">
                        <Row>
                        <Col span={24}>
                        <TargetNode></TargetNode>
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