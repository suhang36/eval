import React from 'react'
import { Card, Input, Badge, Row, Button, Col,Popconfirm, Typography } from 'antd';
import { withRouter } from 'react-router-dom'
const { Search } = Input;
@withRouter
class Pjteacher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            papers: [
                {
                    id: "19301",
                    title: "辅导员评价",
                    batch: "2019第二学期",
                    status: 0,
                    date: '2019-9-27',
                    number: 23,
                },
                {
                    id: "19302",
                    title: "软件工程老师评价",
                    batch: "2019第一学期",
                    status: 1,
                    date: '2019-9-27',
                },
                {
                    id: "19303",
                    title: "数据库老师评价",
                    batch: "2019第三学期",
                    status: 1,
                    date: '2019-9-27',
                }
            ]
        }
    }
    render() {
        return <div>
            <Card title="评价老师" extra={<div>
            </div>
            } style={{ padding: 24, background: '#fff', marginTop: 32 }}>
                {this.state.papers.map(item =>
                    <Card key={item.id} style={{ marginTop: 16 }} type="inner" title={item.batch} extra={<div><span>id:&nbsp;{item.id}</span>
                        &nbsp;&nbsp;&nbsp;<span>日期:&nbsp;{item.date}</span>
                        &nbsp;&nbsp;&nbsp;<span>状态:&nbsp;{item.status === 0 ? <Badge color={'green'} text={'未评'} /> : <Badge color={'red'} text={'已评'} />}</span></div>}>
                        <Row>
                            <Col span={18}>
                                <span>{item.title}</span>
                            </Col>
                            <Col span={6} >
                                    {item.status===0?<Button type="link" href="/testpaper/3" icon={'edit'} >
                                    开始评教
                                    </Button>:
                                    <Typography>已关闭</Typography>
                                }
                            </Col>
                        </Row>
                    </Card>
                )}
            </Card>
        </div>
    }
}

export default Pjteacher