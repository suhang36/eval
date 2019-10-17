import React from 'react'
import { Popconfirm, Divider,message, Table,Transfer, Row, Col,Select,Drawer,DatePicker,Icon, Typography, Button,Form,Input,Modal } from 'antd'
import Axios from 'axios';
import { connect } from 'react-redux'
import {getMenu} from '../../redux/user.redux'
const { Title } = Typography;
const { Option } = Select
// 数据结构

@connect(state => state.user,{getMenu})
class RoleC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          menu:[
          ],
          role:[],
            roleinfo: {},
            pagination: {
            hideOnSinglePage: true
            },
            loading: false,
            AddLoading:false,
            visible: false,
            mockData: [],
            targetKeys: [],
        }
        // 表单结构
        this.colums = [
            {
                title: '角色名',
                dataIndex: 'name',
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
    handlEdit=(id)=>{
      console.log(id)
      const roleinfo = this.state.role.filter(v=>v.id===id)
      this.setState({
        roleinfo:roleinfo
      })
    }

    handleOk = (e) => {
      e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(JSON.stringify(values,null,2))
            this.setState({
              AddLoading: true,
            });
            Axios({
              method:'post',
              url:'/addrole',
              data:{
                ...values
              }
              }
            ).then(res=>{
              if(res.data.code===1){
                this.setState({
                  visible: false,
                  confirmLoading: false,
                });
                message.success("添加成功")
                this.fetch()
              }else{
                message.error('添加失败')
              }
             
            })
          }
        });
      };
    handleCancel = () => {
        this.setState({
          visible: false,
        });
      };
    componentDidMount() {
     this.fetch()
    }
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
    fetch = () => {
        this.setState({ loading: true });
        Axios({
            url: '/getRole',
            method: 'get',
            type: 'json',
        }).then(res => {
            this.setState({
                loading: false,
                role: res.data,
            });
        });

        Axios({
          url: '/getmenuall',
          method: 'get',
          type: 'json',
      }).then(res => {
          this.setState({
              menu: res.data.getmenuall,
          });
          this.getMock();
      });
    };
    getMock = () => {
      const targetKeys = [];
      const mockData = [];
      if(this.props.menu==='undefined'){
        // this.props.getMenu()
        return
      }
      this.state.menu.map(item=>{
        const is=false
        const data = {
          key:item.id,
          title:item.name,
          description: `菜单`,
          chosen:is
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      })
      this.setState({ mockData, targetKeys });
    };
  
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
  
    handleChange = targetKeys => {
      this.setState({ targetKeys });
    };
  
    handleSearch = (dir, value) => {
      console.log('search:', dir, value);
    };

    handleClick = () => {
        this.setState({
            visible: true
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const main =<div>
        <Drawer
          title="新建角色"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleOk}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="角色名">
                  {getFieldDecorator('rolename', {
                    rules: [{ required: true, message: '请输入角色名' }],
                    initialValue:this.state.roleinfo.name
                  })(<Input placeholder="角色名" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="功能菜单">
                  {getFieldDecorator('menu', {
                    rules: [
                      {
                        required: true,
                        message: '请添加菜单',
                      },
                    ],
                  })(

                    <Transfer                   
                    dataSource={this.state.mockData}//数据
                    showSearch//是否显示搜索框
                    filterOption={this.filterOption}//判读搜索框
                    targetKeys={this.state.targetKeys}//key值
                    onChange={this.handleChange}
                    onSearch={this.handleSearch}//搜索框内容改变时
                    render={item => item.title}//单行渲染
                    titles={['未添加菜单','已添加菜单']}
                    listStyle={{
                      width: 250,
                      height: 300,
                    }}
                  />
                  )}
                </Form.Item>
              </Col>
            </Row>
          
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button htmlType="submit" loading={this.state.AddLoading}  type="primary">
              提交
            </Button>
          </div>
          </Form>
        </Drawer>
      </div>
        return <Row>
                    <Col span={20}>
                        <Title level={3}>角色管理</Title>
                    </Col>
                    <Button type="primary" onClick={this.showDrawer}>
                      <Icon type="plus" /> 新建
                    </Button>
                    <Table
                        columns={this.colums}
                        rowKey={record => record.id}
                        dataSource={this.state.role}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                    //   onChange={this.handleTableChange}
                    />
                    {main}
            </Row>
            }
    }
    const Role = Form.create()(RoleC)
export default Role