import React from 'react'
import Axios from 'axios';
import { Card, Select, Input, Badge, Row, Button,Modal, Col,Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom'
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
@withRouter
class Paper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            papers: [
            ],
            batch:[]
        }
    }
    componentDidMount(){
        this.fetch()
    }
    handlopenbatch=info=>{
        this.setState({
            batchopenindex:info
        })
    }
    openbatch=()=>{
        if(typeof(this.state.batchopenindex)!=='undefined'){
            Axios({
                url:'/updateBatchT',
                method:'post',
                params:{
                    id:this.state.batchopenindex
                }
            }).then(res=>{
                if (res.data===1) {
                    message.success('开启成功')
                    this.fetch()
                }else{
                    message.error('开启失败')
                }
            })
        }else{
            message.error('请选择批次')
        }
    }//删除一个试卷
    handleDeletePager=(id)=>{
        Axios({
            url:'/deletePager',
            method:'post',
            params:{
                id:id
            }
        }).then(res=>{
            if (res.code===1) {
                message.success('删除成功')
            }else{
                message.error('删除失败')
            }
        })
    }
    fetch=()=>{
        Axios({
            url:'/getBatch',
            method:'post',
            type:'json',
        }).then(res=>{
            this.setState({
                batch:res.data
            })
        })
        Axios({
            url:'/getquestion',
            method:'post',
            type:'json'
        }).then(res=>{
            this.setState({
                papers:res.data.questionall
            })
        })
    }
    handleSerach=(value)=>{
        Axios({
            url:'/'
        })
    }
    render() {
        return <div>
            <Card title="试卷管理"  extra={<div>
                <Popconfirm
                    title="您确定开启吗，这会关闭已开启的批次"
                    onConfirm={this.openbatch}
                    okText="确定"
                    cancelText="取消"
                >
                <Button type="primary" 
                style={{marginRight:5}}
                    >
                    开启批次
                </Button>
                </Popconfirm>
                <Select
                    showSearch
                    style={{ width: 200,marginRight:20 }}
                    placeholder="选择批次"
                    onChange={this.handlopenbatch}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.state.batch.map(v=>
                        <Option key={v.id} value={v.id}>{v.name}</Option>
                    )}
                </Select>
                <Search
                    placeholder="输入查询的内容"
                    onSearch={this.handleSerach}
                    style={{ width: 200 }}
                />
                <Button type="primary" icon={'plus'}
                     onClick={() => this.props.history.push({
                        pathname: '/writePager',
                        state: {
                            id: 0,//试卷id
                        }
                })} style={{ marginLeft: 10 }} >
                    添加
                </Button>
            </div>
            } style={{ padding: 24, background: '#fff', marginTop: 32 }}>
                {this.state.papers.map(item =>
                    <Card key={item.id} style={{ marginTop: 16 }} type="inner" title={item.batch} extra={<div><span>id:&nbsp;{item.id}</span>
                        &nbsp;&nbsp;&nbsp;<span>日期:&nbsp;{item.date}</span>
                        &nbsp;&nbsp;&nbsp;<span>状态:&nbsp;{item.state === 0 ? <Badge color={'green'} text={'进行中'} /> : <Badge color={'red'} text={'未开始'} />}</span></div>}>
                        <Row>
                            <Col span={18}>
                                <span>{item.name}</span>
                            </Col>
                            <Col span={6} >
                                <Button type="link" onClick={() => this.props.history.push({
                                    pathname: '/writePager',
                                    state: {
                                        id: item.id,//试卷id
                                    }
                            })} icon={'edit'} >
                                    修改
                                </Button>
                                <Popconfirm
                                    title="确定删除吗，无法恢复哦"
                                    onConfirm={()=>{
                                        this.handleDeletePager(item.id)
                                    }}
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