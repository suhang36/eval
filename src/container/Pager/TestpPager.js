import React from 'react'
import {Layout,Divider,Button,Row,Col,Typography} from 'antd'
import Option from '../../component/option/index'
import { withRouter } from 'react-router-dom'
const {Title} =Typography
const {Content,Footer} =Layout
class TestPager extends React.Component{
    constructor(props){
        super(props)
        this.state={
            subdata:{
                title: "第一次考试",
                batch:"第一学期",
                college:"软件学院",
                problem:[
                    {
                        id:1,
                        title:'重难点讲解',
                        option:[
                            {
                                id:1,
                                title:'非常满意',
                            },
                            {
                                id:2,
                                title:'满意',
                            },
                            {
                                id:3,
                                title:'不满意',
                            },
                            {
                                id:4,
                                title:'非常不满意',
                            }
                        ]
                    },
                    {
                        id:1,
                        title:'重难点讲解',
                        option:[
                            {
                                id:1,
                                title:'非常满意',
                            },
                            {
                                id:2,
                                title:'满意',
                            },
                            {
                                id:3,
                                title:'不满意',
                            },
                            {
                                id:4,
                                title:'非常不满意',
                            }
                        ]
                    }
                ]
            }
        }
    }
    render(){
        return <Layout className="layout">
        <Content style={{ padding: '0 50px',marginTop:'10vh' }}>
          <div style={{ background: '#fff', padding: 20, minHeight: '90vh' }}>
              <Button type='link'>返回上一级</Button>
          <Divider />
          <Title level={4} style={{ textAlign: 'center' }}>{this.state.subdata.title}</Title>
                                <Row>
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Typography>{this.state.subdata.batch}</Typography>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'center' }}>
                                        <Typography>{this.state.subdata.college}</Typography>
                                    </Col>
                                </Row>
                            {/* 题目 */}
                            <Col style={{ padding: 24, overflow: 'hidden', background: '#fff' }} >
                                {this.state.subdata.problem.map(v=>
                                    {return <Option problem={v} ></Option>}
                                    )}
                                <Divider />
                            </Col>
                            <Button type='primary' style={{left:'47%'}}>提交</Button>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>在线评教</Footer>
      </Layout>
    }
}
export default TestPager