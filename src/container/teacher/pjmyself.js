import React from 'react'
import { Card, Input, Badge, Row, Button, Col,Popconfirm, Typography } from 'antd';
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
const { Search } = Input;
@withRouter
class Pjmyself extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            papers: [
            ]
        }
    }
    componentDidMount(){
        this.fetch()
    }
    fetch=()=>{
        console.log(sessionStorage.getItem('username'))
        Axios({
            url:'/getteacherzcquestion',
            method:'get',
            params:{
                teachername:sessionStorage.getItem('username')
            }
        }).then(res=>{
            console.log(JSON.stringify(res.data.studentquestion,null,2))
            let query=[res.data.querytionexa]
            this.setState({
                papers:query
            })
        })
    }
    render() {
        return <div>
            <Card title="自评" extra={<div>
            </div>
            } style={{ padding: 24, background: '#fff', marginTop: 32 }}>
                {this.state.papers.map(item =>
                    <Card key={item.id} style={{ marginTop: 16 }} type="inner" title={item.name} extra={<div>
                        &nbsp;&nbsp;&nbsp;
                        <span>老师姓名：&nbsp;{item.tname}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>id:&nbsp;{item.tid}</span>
                        &nbsp;&nbsp;&nbsp;<span>状态:&nbsp;{item.state === 1 ? <Badge color={'green'} text={'未评'} /> : <Badge color={'red'} text={'已评'} />}</span></div>}>
                        <Row>
                            <Col span={18}>
                                <span>{item.qname}</span>
                            </Col>
                            <Col span={6} >
                                    {item.state===1?<Button type="link" onClick={() => this.props.history.push({
                                    pathname: '/testpaper',
                                    state: {
                                        id: item.qid,//试卷id
                                        bid:item.bid,//批次id
                                        name:sessionStorage.getItem('username'),
                                        tid:item.tid
                                    }
                            })} icon={'edit'} >
                                    开始评教
                                    </Button>:
                                    <Typography>当前批次没有试卷</Typography>
                                }
                            </Col>
                        </Row>
                    </Card>
                )}
            </Card>
        </div>
    }
}

export default Pjmyself