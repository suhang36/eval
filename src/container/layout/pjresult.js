import React from 'react'
import {Card, Select,Input, Col, Row, Table} from 'antd'
const { Option } = Select;
const { Search } = Input;
class Pjresult extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[
                {
                    name:'李郑源',
                    college:'软件学院',
                    batch:'2019第一学期',
                    type:'学生评',
                    score:93.4
                }
            ]
        }
    }
    render(){
        const columns = [
            {
              title: '教师名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '学院',
              dataIndex: 'college',
              key: 'college',
            },
            {
                title:'批次',
                dataIndex: 'batch',
                key:'batch'
            },
            {
                title:'类型',
                dataIndex:'type',
                key:'type'
            },
            {
                title:'分数',
                dataIndex:'score',
                key:'score'
            }
        ]
        return <div style={{ padding: 24, background: '#fff', marginTop: 32 }}>
            
            <Card bordered={false} title="评教统计">
            <Row>
                <Col span={6}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="过滤批次"
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="jack">第一学期</Option>
                <Option value="lucy">第二学期</Option>
                <Option value="tom">第三学期</Option>
            </Select>
            </Col>
            <Col span={6}>
            <Select
                showSearch
                style={{ width: 200}}
                placeholder="过滤类型"
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="jack">学生评价</Option>
                <Option value="lucy">同行评价</Option>
                <Option value="tom">自评</Option>
            </Select>
            </Col>
            <Col span={6}>
            <Search  placeholder="查询老师" onSearch={value => console.log(value)} enterButton />
            </Col>
            <Col style={{marginTop:20}} span={24}>
            <Table columns={columns} dataSource={this.state.data} />
            </Col>
            </Row>
            </Card>
        </div>
    }
}

export default Pjresult