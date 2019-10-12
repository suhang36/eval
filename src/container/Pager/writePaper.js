import React from 'react'
import Axios from 'axios';
import { Layout, Menu, Tree, Divider, Typography, Row, Col, Input,Select } from 'antd'
import Option from '../../component/option/index'
const { Header, Content, Footer } = Layout;
const { Title, } = Typography;
const { TreeNode } = Tree;
class WritPager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [
            ],
            batch:[],
            subdata:{
                id:'192302',
                title: "第一次考试",
                batch:"第一学期",
                type:'自评',
                problem:[
                    {
                        id:1,
                        title:'重难点讲解',
                        option:[
                        ]
                    }
                ]
            }
        }
    }
    componentDidMount() {
        this.fetch()
        console.log(this.props.match.params)
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
        Axios({
            url:'/getBatch',
            method:'post',
            type:'json'
        }).then(res=>{
                this.setState({
                    batch:res.data
                })
        })
    }
    //添加指标的函数
    targetmeager=(keys)=>{
        Axios({
            
        })
    }

     onChange=(evals,value)=> {
        let data = Object.assign({}, this.state.subdata, { [evals]: value })
        this.setState({
            subdata:data
        })
      }
    render() {
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
        return <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1" style={{ float: "right" }}>提交试卷</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 100, minHeight: '73vh' }}>
                <Row>
                    <Col span={5} style={{ padding: 24, overflow: 'hidden', background: '#fff', marginTop: 12 }}>
                        {/* 树 */}
                        <Title level={4}>指标树</Title>
                        <Divider />
                        <Tree
                            checkable
                            className="draggable-tree"
                            defaultExpandedKeys={this.state.expandedKeys}
                            onCheck={this.targetmeager}
                        >
                            {loop(this.state.treeData)}
                        </Tree>
                    </Col>
                    <Col span={18} offset={1}>
                        <Row>
                            <Col style={{ padding: 24, overflow: 'hidden', background: '#fff', marginTop: 12 }}>
                                <Row>
                                    <Col span={12}>
                                        <span>标题：</span><Input onChange={v=>this.onChange('title',v.target.value)} placeholder="试卷名" style={{ width: '70%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <span>类型: </span><Select
                                            onChange={(v)=>this.onChange('',v)}
                                            showSearch
                                            style={{ width: '70%' }}
                                            placeholder="类型"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Select.Option value="同行">同行</Select.Option>
                                            <Select.Option value="自评">自评</Select.Option>
                                            <Select.Option value="学生评">学生评</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col span={12} style={{ marginTop: 20 }}>
                                        <span>批次：</span><Select
                                            onChange={(v)=>this.onChange('batch',v)}
                                            showSearch
                                            style={{ width: '70%' }}
                                            placeholder="批次："
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.state.batch.map(v=>{
                                               return <Option value={v.name}>{v.name}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                            <Col style={{ padding: 24, overflow: 'hidden', background: '#fff', marginTop: 12 }}>
                                <Title level={4} style={{ textAlign: 'center' }}>{this.state.subdata.title}</Title>
                                <Row>
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Typography>{this.state.subdata.batch}</Typography>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Typography>{this.state.subdata.type}</Typography>
                                    </Col>
                                </Row>
                            </Col>
                            {/* 题目 */}
                            <Col style={{ padding: 24, overflow: 'hidden', background: '#fff' }} >
                                {this.state.subdata.problem.map(v=>
                                    {return <Option problem={v} ></Option>}
                                    )}
                                <Divider />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>在线考试系统 第4组</Footer>
        </Layout>
    }
}
export default WritPager