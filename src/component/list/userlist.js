import { Table, Popconfirm, Divider } from 'antd';
import React from 'react';
import Axios from 'axios';
import UserEdit from '../../component/edit/userEdit'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      userinfo:{},
      pagination: {},
      loading: false,
      visible: false,
    };
    this.columns = [
      {
        title: '昵称',
        dataIndex: 'username',
        width: '20%',
      },
      {
        title: '真实名',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: '院系',
        dataIndex: 'college',
        width: '20%',
      },
      {
        title: '角色',
        dataIndex: 'role',
        width: '20%',
      },
      {
        title: '操作',
        key: 'option',
        render: (record) => (<div>
          <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => this.handlEdit(record.id)}>Edit</a>
        </div>
        )
        ,
        width: '20%',
      },
    ];
  }
  handlEdit = (id) => {
    this.showModal()
    console.log(this.state.data+"----"+id)
    const userinfo=this.state.data.filter(v=>
      v.id===id
      )
      this.setState({
        userinfo:userinfo[0]
      })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleDelete = (key) => {
    console.log(key)
  }
  componentDidMount() {
    this.fetch();
  }
   //发送信息
  handleTableChange = (pagination, filters, sorter) => {
    // alert('begin')
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
    });
  };

  fetch = (params = { "pageSize": 5, "pageNum": 1 }) => {
    // console.log(params)
    this.setState({ loading: true });
    Axios({
      url: '/getuserall',
      method: 'get',
      params: {
        // results: 10,
        ...params,
      },
      type: 'json',
    }).then(res => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = res.data.total;
      // console.log(JSON.stringify(res.data.list,null,2))
      this.setState({
        loading: false,
        data: res.data.list,
        pagination,
      });
    });
  };

  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        <UserEdit visible={this.state.visible} handleCancel={this.handleCancel} userinfo={this.state.userinfo}></UserEdit>
      </div>
    );
  }
}
export default UserList