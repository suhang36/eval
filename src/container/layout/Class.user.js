import React from 'react';
import { Table ,Popconfirm,message,Divider,Row,Col,Typography,Button,Icon,Select} from 'antd';
import Axios from 'axios'
import Userclassadd from '../../component/from/userclass-form'
const { Title } = Typography
const { Option } = Select
class CU extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            solter:0,
            classdata:[
            ],//列表展示数据
            data:[{
                id:'1',
                name:'1690019'
            }],//所有的班级
            visible: false,//边侧栏是否显示
            student:[],//未分配学生
            role:[],//未知
            roleinfo: {},//未知
            AddLoading:false,//是否显示正在提交
            pagination: {
            hideOnSinglePage: true
            },//未知
            loading: false,//未知
            AddLoading:false,//是否显示正在提交
            mockData: [],//显示在边侧栏
            targetKeys: [],//已选择的学生id
        }
        this.columns=[
            {
                title: '昵称',
                dataIndex: 'username',
                width: '20%',
            },
            {
                title: '姓名',
                dataIndex: 'stname',
                width: '20%',
            },
            {
                title: '班级',
                dataIndex: 'clname',
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
    //生成学生的列表（未改）
  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    if(this.state.student==='undefined'){
      // this.props.getMenu()
      return
    }
    this.state.student.map(item=>{
      const is=false
      const data = {
        key:item.id,
        title:item.name,
        description: `学生`,
        chosen:is
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    })
    this.setState({ mockData, targetKeys });
  };
  //穿梭栏搜索框
  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
  //当穿梭框发生变化时
  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };
  //点击search
  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };
    
  componentDidMount(){
        this.fetch()
        this.getMock()
    }
    fetch = () => {
        Axios({//拿到所有的班级
            url:'/getclassall',
            method:'post'
        }).then(res=>{
            this.setState({data:res.data.getclassall})
        })
        Axios({//列表展示数据：学生和老师
            url:'/getstudentclass',
            method:'get',
        }).then(res=>{
            this.setState({classdata:res.data.getstudentclass})
        })
        Axios({//未分配班级的学生
            url:'/selectstudents',
            method:'post'
        }).then(res=>{
            this.setState({student:res.data.data})
            this.getMock()
        })

    };

    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
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
            <Title level={3}>班级学生管理</Title>
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
            placeholder="过滤班级"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {this.state.data.map(v=>
                <Option value={v.id}>{v.name}</Option>
            )}
        </Select>
        
        <Table
            columns={this.columns}
            // rowKey={record => record.id}
            dataSource={this.state.classdata}
            // pagination={this.state.pagination}
            // loading={this.state.loading}
        //   onChange={this.handleTableChange}
        />
        {/* {main} */}
        <Userclassadd 
        ref="getFormValue"
        visable={this.state.visible} 
        onClose={this.onClose}
        mockData={this.state.mockData}
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        handleChange={this.handleChange}
        handleSearch={this.handleSearch}
        AddLoading={this.state.AddLoading}
        handleOk={this.handleOk}
        data={this.state.data}
        ></Userclassadd>
</Row>
</div> 
    }
}
export default CU