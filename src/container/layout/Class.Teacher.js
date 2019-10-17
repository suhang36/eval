import React from 'react';
import { Table, Popconfirm, message, Modal, Divider, Row, Col, Typography, Button, Icon, Select } from 'antd';
import Axios from 'axios'
import Userteacheradd from '../../component/from/userteacher';
const { Title } = Typography
const { Option } = Select
class CT extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      solter: 0,
      classdata: [
        {
          id: '1',
          name: '1690019'
        }
      ],
      data: [
      ],
      allcurse:[],
      allCollege:[],
      allteacher:[],
      allclass:[],
      visible: false,
    }
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: '班级',
        dataIndex: 'classname',
        width: '20%',
      },
      {
        title: '课程',
        dataIndex: 'curr',
        width: '20%',
      },
      {
        title: '学院',
        dataIndex: 'college',
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

  componentDidMount() {
    this.fetch()
  }

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
  fetch=()=>{//页面初始化需要的数据
    Axios({//获取所有的课程
      url:'/selectAllCurriculum',
      method:'post'
    }).then(res=>{
      this.setState({
        allcurse:res.data.data
      })
    })
    Axios({//获取所有的老师
      url:'/selectAllTeacher',
      method:'post'
    }).then(res=>{
      this.setState({
        allteacher:res.data.data
      })
    })
    Axios({//获取所有的学院
      url:'/getCollege',
      method:'post'
    }).then(res=>{
      this.setState({
        allCollege:res.data
      })
    })
    this.setState({ loading: true });
    Axios({//初始化显示列表
      url: '/getrelationship',
      method: 'get',
      type: 'json',
    }).then(res => {
      this.setState({
        loading: false,
        data: res.data.relationship,
      });
    });
    Axios({//拿到所有的班级
      url:'/getclassall',
      method:'post'
  }).then(res=>{
      this.setState({allclass:res.data.getclassall})
  })
  }
  handleOk = e => {//提交modal内属性：老师班级关系
    e.preventDefault();
    let demo = this.refs.getFormVlaue;//通过refs属性可以获得对话框内form对象
    demo.validateFields((err, values) => {
      if (!err) {
        console.log(JSON.stringify(values,null,2))
        Axios({
          method: 'post',
          url: '/insertRelationShip',
          data: {
            ...values
          }
        }
        ).then(res => {
          if (res.data.data === 1) {
            this.setState({
              visible: false,
            });
            message.success("添加成功")
          }else{
          message.error('添加失败')
        }
        })
      }
    })
  };
  showModal = () => {//显示modal
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {//关闭modal
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return <div style={{ padding: 24, background: '#fff', marginTop: 32 }}>
      <Row>
        <Col span={24}>
          <Title level={3}>授课信息管理</Title>
        </Col>
        <Col span={12} style={{ marginBottom: 20 }}>
          <Button type="primary" onClick={this.showModal}>
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
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSearch={this.onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.state.classdata.map(v =>
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
        <Modal
          title="管理老师班级关系"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Userteacheradd 
          allteacher={this.state.allteacher} 
          allcurse={this.state.allcurse}  
          ref="getFormVlaue" 
          allCollege={this.state.allCollege}
          allclass={this.state.allclass}
          ></Userteacheradd>
        </Modal>
      </Row>
    </div>
  }
}
export default CT