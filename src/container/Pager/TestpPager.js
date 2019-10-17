import React from 'react'
import { Layout, Divider, Button, Row, Col, Typography, message } from 'antd'
import Option from '../../component/option/index'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
const { Title } = Typography
const { Content, Footer } = Layout
class TestPager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subdata: {

                "id": 1,
                "title": "自测问卷",
                "batch": "大一上学期",
                "problem": [
                    {
                        "id": 1,
                        "title": "1",
                        "option": [
                            {
                                "id": 1,
                                "title": "非常满意"
                            },
                            {
                                "id": 2,
                                "title": "满意"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "title": "同行",
                        "option": [
                            {
                                "id": 1,
                                "title": "非常满意"
                            },
                            {
                                "id": 2,
                                "title": "满意"
                            },
                            {
                                "id": 3,
                                "title": "比较满意"
                            },
                            {
                                "id": 4,
                                "title": "一般"
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "title": "自评",
                        "option": [
                            {
                                "id": 1,
                                "title": "非常满意"
                            },
                            {
                                "id": 3,
                                "title": "比较满意"
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "title": "领导",
                        "option": [
                            {
                                "id": 3,
                                "title": "比较满意"
                            },
                            {
                                "id": 4,
                                "title": "一般"
                            }
                        ]

                    }
                ]}
                
            }
    
}
    onchange=(id,value)=>{
        let data=this.state.subdata
      let okpro =  data.problem.map(v=>{
            if(v.id===id){
                v.click=value.target.value
                return v
            }
            return v
        })
        data.problem=okpro
        // let data = Object.assign({}, this.state.subdata, { [name]: value })
        this.setState({
            subdata: data
        })
    }
    handleClick=()=>{
        let subok=true
        this.state.subdata.problem.map(v=>{
            if(typeof(v.click)==='undefined'){
                subok=false
            }
        })
        if(subok){
            console.log(JSON.stringify(this.state.subdata,null,2))
            Axios({
                url:'/insertGeneral',
                method:'post',
                data:{
                    ...this.state.subdata
                }
            }).then(res=>{
                if(res.data.test===1){
                    message.success('提交成功')
                    this.props.history.push('/index')
                }else{
                    message.error('提交失败')
                }
            })
        }else{
            message.error('没做完哦')
        }
    }
    componentDidMount() {
                Axios({
                    url: '/selectOnlineEvaluation',
                    method: 'post',
                    params: {
                        qid: this.props.history.location.state.id
                    }
                }).then(res => {
                    let data=res.data.subdata[0]
                    data.bid=this.props.history.location.state.bid
                    data.name=this.props.history.location.state.name
                    data.tid=this.props.history.location.state.tid
                    this.setState({
                        subdata:data
                    })
                })
            }
    render() {
                return <Layout className="layout">
                    <Content style={{ padding: '0 50px', marginTop: '10vh' }}>
                        <div style={{ background: '#fff', padding: 20, minHeight: '90vh' }}>
                            <Button type='link' href="/index">返回上一级</Button>
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
                                {this.state.subdata.problem.map(v => { return <Option key={v.id} onchange={this.onchange} problem={v} ></Option> }
                                )}
                                <Divider />
                            </Col>
                            <Button type='primary' onClick={this.handleClick} style={{ left: '47%' }}>提交</Button>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>在线评教</Footer>
                </Layout>
            }
        }
        export default TestPager