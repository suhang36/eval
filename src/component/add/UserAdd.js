import React from 'react'
import { Form, Input,Row,Col,Checkbox,message, Modal, Button,Select,Typography} from 'antd'
import { getrole } from '../../redux/role.redux'
import {getcollege}from '../../redux/college.redux'
import { connect } from 'react-redux'
import Axios from 'axios';
const FormItem = Form.Item;
const {Option}=Select
const { Title } = Typography;

@connect(state => state, { getrole,getcollege})
class UserAddCompent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmLoading: false,
    };

  }
  //显示model
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //处理submit
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        console.log(JSON.stringify(values,null,2))
        Axios({
          method:'post',
          url:'/adduser',
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
            message.success('添加成功')
          }
         
        })
      }
      
    });
    
  };
  // 关闭显示
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  //检查数据是否存在
  getRole = () => {
    this.props.getrole()
  }
  handlSelect=()=>{
    // this.props
  }
  getcollege=()=>{
    this.props.getcollege()
  }
  render() {
    const plainOptions=this.props.role.role?this.props.role.role:this.getRole()
    const college = this.props.college.college?this.props.college.college:this.getcollege()
    const props=college
    const { getFieldDecorator } = this.props.form;
    //布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    let collegeList={}
    if(college !==undefined){
      collegeList=college.map(v=>
        <Option key={v.id}>{v.name}</Option>
      )
    }
    let roleList=<Col></Col>
    if(plainOptions !==undefined){
      roleList=plainOptions.map(v=>{
        return <Checkbox key={v.id} value={v.id}>{v.name}</Checkbox>
        }
      )
    }
    const main = (
      <div >
        <Form {...formItemLayout} {...props}  onSubmit={this.handleSubmit} onChange={this.handlChange}>
          <Form.Item
            label={
              <span>
                昵称&nbsp;
              </span>
            }
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入昵称', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                姓名&nbsp;
                    </span>
            }
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <FormItem
            label='角色'>
            {
              getFieldDecorator('role', {
                rules: [{
                  required: true,
                  message: 'Please input your note!'
                }],
                initialValue: [],
              })(<Checkbox.Group style={{ width: '100%' }}>
              
                {roleList}
              
            </Checkbox.Group>)
            }
          </FormItem>
          <Form.Item label="学院">
          {getFieldDecorator('college', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="选择学院"
              onChange={this.handleSelectChange}
              optionFilterProp="children"
              showSearch
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {collegeList}
            </Select>,
          )}
         </Form.Item>
        </Form>
      </div>)
    return (
      <Row>
        <Col span={20}>
        <Title level={2}>用户管理</Title>
        </Col>
        <Col span={4}>
           <Button style={{marginLeft:80}} type="primary"  onClick={this.showModal} className="button-add">添加用户</Button>
       </Col>
        <Modal
          title="添加用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          {main}
        </Modal>
      </Row>
    )
  }
}
const UserAdd = Form.create(
)(UserAddCompent)
export default UserAdd