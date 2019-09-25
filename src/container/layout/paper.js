import React from 'react'
import { Card, Input, Badge, Row, Button, Col,Popconfirm } from 'antd';
import { withRouter } from 'react-router-dom'
const { Search } = Input;
@withRouter
class Paper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            papers: [
                {
                    id: "19302",
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
                    id: "19302",
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
            <Card title="试卷管理" extra={<div>
                <Search
                    placeholder="输入查询的内容"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
                <Button type="primary" icon={'plus'}
                     onClick={() => this.props.history.push('/writePager/3')} style={{ marginLeft: 10 }} >
                    添加
                </Button>
            </div>
            } style={{ padding: 24, background: '#fff', marginTop: 32 }}>
                {this.state.papers.map(item =>
                    <Card style={{ marginTop: 16 }} type="inner" title={item.batch} extra={<div><span>id:&nbsp;{item.id}</span>
                        &nbsp;&nbsp;&nbsp;<span>日期:&nbsp;{item.date}</span>
                        &nbsp;&nbsp;&nbsp;<span>状态:&nbsp;{item.status === 0 ? <Badge color={'green'} text={'进行中'} /> : <Badge color={'red'} text={'未开始'} />}</span></div>}>
                        <Row>
                            <Col span={18}>
                                <span>{item.title}</span>
                            </Col>
                            <Col span={6} >
                                <Button type="link" icon={'edit'} >
                                    修改
                                </Button>
                                <Popconfirm
                                    title="确定删除吗，无法恢复哦"
                                    // onConfirm={confirm}
                                    // onCancel={cancel}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type="link" icon={'delete'} >
                                    删除
                                    </Button>
                                </Popconfirm>
                                
                            </Col>
                        </Row>
                    </Card>
                )}
            </Card>
        </div>
    }
}

export default Paper