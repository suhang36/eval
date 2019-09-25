import React from 'react';
import { Table ,Popconfirm,Divider,Row,Col,Typography,Button,Icon,Select} from 'antd';
import Axios from 'axios'
const { Title } = Typography
const { Option } = Select
class CT extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            solter:0,
            classdata:[
                {
                    id:'1',
                    name:'1690019'
                }
            ],
            data:[
                {
                    id:'1',
                    name:"苏航",
                    course:"软件工程",
                    class:"1690019"
                }
            ]
        }
        this.columns=[
            {
                title: '姓名',
                dataIndex: 'name',
                width: '20%',
            },
            {
                title: '班级',
                dataIndex: 'class',
                width: '20%',
            },
            {
                title: '课程',
                dataIndex: 'course',
                width: '20%',
            },
            {
                title: '操作',
                key: 'option',
                render: (record) => (<div>
                    <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record.id)}>
                        <a>删除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a onClick={() => this.handlEdit(record.id)}>修改</a>
                </div>
                )
                ,
                width: '20%',
            },
        ]
    }

    fetch = (params = { "pageSize": 10, "pageNum": 1}) => {
        this.setState({ loading: true });
        Axios({
            url: '/getuserall',
            method: 'get',
            params: {
                'solter':this.state.solter,
                ...params,
            },
            type: 'json',
        }).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.total;
            this.setState({
                loading: false,
                data: res.data.data,
                pagination,
            });
        });
        Axios({
            url:'/getclassall',
            method:'get',
            type:'json'
        }).then(res=>{
            if(res.code){
                this.setState({classdata:res.data.data})
            }
        })
    };
     onChange(value) {
        console.log(`selected ${value}`);
      }
      
       onBlur() {
        console.log('blur');
      }
      
       onFocus() {
        console.log('focus');
      }
      
       onSearch(val) {
        console.log('search:', val);
      }
    render (){
        return <div style={{ padding: 24, background: '#fff',marginTop:32 }}> 
        <Row>
        <Col span={24}>
            <Title level={3}>授课信息管理</Title>
        </Col>
        <Col span={12} style={{marginBottom:20}}>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> 新建
        </Button>
        </Col>
        <span>过滤班级:&nbsp;</span>
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {this.state.classdata.map(v=>
                <Option value={v.id}>{v.name}</Option>
            )}
        </Select>
        
        <Table
            columns={this.columns}
            // rowKey={record => record.id}
            dataSource={this.state.data}
            // pagination={this.state.pagination}
            // loading={this.state.loading}
        //   onChange={this.handleTableChange}
        />
        {/* {main} */}
</Row>
</div> 
    }
}
export default CT