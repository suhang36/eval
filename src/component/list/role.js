import React from 'react'
import { Popconfirm, Divider, Table,Transfer, Row, Col,Select,Drawer,DatePicker,Icon, Typography, Button,Form,Input,Modal } from 'antd'
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
            {
              "id": 5,
              "name": "用户管理",
              "img": "team",
              "path": "/useradmini"
            },
            {
              "id": 6,
              "name": "授课信息管理",
              "img": "solution",
              "path": null
            },
            {
              "id": 7,
              "name": "学生班级管理",
              "img": "table",
              "path": null
            },
            {
              "id": 8,
              "name": "指标管理",
              "img": "cluster",
              "path": null
            },
            {
              "id": 9,
              "name": "试卷管理",
              "img": "file-done",
              "path": null
            }
          ],
            role: [
                {
                    id: 1,
                    name: "管理员",
                    menu:[
                      {
                        id: 5,
                        name: "用户管理",
                      },
                      {
                        id: 6,
                        name: "授课信息管理",
                      }
                    ]
                },
                {
                    id: 2,
                    name: '领导',
                    menu:[
                      {
                        id: 5,
                        name: "用户管理",
                      },
                      {
                        id: 6,
                        name: "授课信息管理",
                      }
                    ]
                },
                {
                    id: 3,
                    name: '教师',
                    menu:[
                      {
                        id: 5,
                        name: "用户管理",
                      },
                      {
                        id: 6,
                        name: "授课信息管理",
                      }
                    ]
                },
                {
                    id: 4,
                    name: '学生',
                    menu:[
                      {
                        id: 5,
                        name: "用户管理",
                      },
                      {
                        id: 6,
                        name: "授课信息管理",
                      }
                    ]
                }
            ],
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
      console.log(JSON.stringify(this.state.roleinfo,null,2))
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
              AddLoading: true,
            });
            // console.log(JSON.stringify(values,null,2))
            // Axios({
            //   method:'post',
            //   url:'/adduser',
            //   data:{
            //     ...values
            //   }
            //   }
            // ).then(res=>{
            //   if(res.code===1){
            //     this.setState({
            //       visible: false,
            //       confirmLoading: false,
            //     });
            //   }
            // })
          }
          
        });
      };
    handleCancel = () => {
        this.setState({
          visible: false,
        });
      };
    componentDidMount() {
      this.getMock();
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
    fetch = (params = { "pageSize": 10, "pageNum": 1 }) => {
        this.setState({ loading: true });
        Axios({
            url: '/getroleall',
            method: 'get',
            params: {
                ...params,
            },
            type: 'json',
        }).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.total;
            this.setState({
                loading: false,
                data: res.data.list,
                pagination,
            });
        });
    };
    getMock = () => {
      const targetKeys = [];
      const mockData = [];
      if(this.props.menu==='undefined'){
        // this.props.getMenu()
        return
      }
      console.log("menu"+JSON.stringify(this.props.menu,null,2))
      this.state.menu.map(item=>{
        const is=false
        // if(this.state.roleinfo.filter(v=>v.id===item.id))
        // {
        //   is=true
        // }
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

      // for (let i = 0; i < 20; i++) {
      //   const data = {
      //     key: i.toString(),
      //     title: `content${i + 1}`,//显示的值
      //     description: `description of content${i + 1}`,
      //     chosen: Math.random() * 2 > 1,
      //   };
      //   if (data.chosen) {
      //     targetKeys.push(data.key);
      //   }
      //   mockData.push(data);
      // }
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
          <Form layout="vertical" hideRequiredMark>
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
          </Form>
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
              Cancel
            </Button>
            <Button htmlType="submit" loading={this.state.AddLoading} onClick={this.handleOk} type="primary">
              Submit
            </Button>
          </div>
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