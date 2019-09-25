import React from 'react'
import { Popconfirm, Divider, Table, Transfer, Row, Col, Select, Drawer, DatePicker, Icon, Typography, Button, Form, Input, Modal, message } from 'antd'
import Axios from 'axios';
import { connect } from 'react-redux'
import { getMenu } from '../../redux/user.redux'
import WrappedNormalLoginForm from './fun-form';
const { Title } = Typography;
const { Option } = Select
// 数据结构

@connect(state => state.user, { getMenu })
class RoleC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      visible: false
    }
    // 表单结构
    this.colums = [
      {
        title: '功能名',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: '图片',
        dataIndex: 'img',
        width: '20%',
      },
      {
        title: '路径',
        dataIndex: 'path',
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
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    let demo = this.refs.getFormVlaue;//通过refs属性可以获得对话框内form对象
    demo.validateFields((err, values) => {
      if (!err) {
        Axios({
          method: 'post',
          url: '/addrole',
          params: {
            ...values
          }
        }
        ).then(res => {
          if (res.code === 1) {
            this.setState({
              visible: false,
            });
            message.success("添加成功")
          }
          message.error('添加失败')

        })
      }
      this.setState({
        visible: false,
      });
    })
    };




  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };



  handlEdit = (id) => {
    console.log(id)
    const roleinfo = this.state.role.filter(v => v.id === id)
    this.setState({
      roleinfo: roleinfo
    })
    console.log(JSON.stringify(this.state.roleinfo, null, 2))
  }
  componentDidMount() {
    this.fetch();
  }
  fetch = () => {
    this.setState({ loading: true });
    Axios({
      url: '/getmenuall',
      method: 'get',
      type: 'json',
    }).then(res => {
      this.setState({
        loading: false,
        data: res.data.getmenuall,
      });
      this.setState({ loading: false });
    });
  };
  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
  render() {
    return <Row>
      <Col span={20}>
        <Title level={3}>功能管理</Title>
      </Col>
      <Button type="primary" onClick={this.showModal}>
        <Icon type="plus" /> 新建
                    </Button>
      <Table
        columns={this.colums}
        rowKey={record => record.id}
        dataSource={this.state.data}
      //   onChange={this.handleTableChange}
      />
      <Modal
        title="添加功能"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <WrappedNormalLoginForm ref='getFormVlaue'></WrappedNormalLoginForm>
      </Modal>
    </Row>
  }
}
const Fun = Form.create()(RoleC)
export default Fun