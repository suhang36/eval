import React from 'react'
import { Form, Input, Row, Col, Checkbox, Modal, Button, Select } from 'antd'
import { getrole } from '../../redux/role.redux'
import { getcollege } from '../../redux/college.redux'
import { connect } from 'react-redux'
import Axios from 'axios';
const FormItem = Form.Item;
const { Option } = Select

@connect(state => state, { getrole, getcollege })
class UserEditCompent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmLoading: false,
        };
    }
    //处理submit
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            values.id=this.props.userinfo.id
            console.log(JSON.stringify(values,null,2))
            if (!err) {
                this.setState({
                    confirmLoading: true,
                });
                console.log(JSON.stringify(values, null, 2))
                Axios({
                    method: 'post',
                    url: '/edituser',
                    data: {
                        ...values
                    }
                }
                ).then(res => {
                    if (res.code === 1) {
                        this.setState({
                            visible: false,
                            confirmLoading: false,
                        });
                    }
                })
            }
        });
    };
    //检查数据是否存在
    getRole = () => {
        this.props.getrole()
    }
    getcollege = () => {
        this.props.getcollege()
    }
    render() {
        const userinfo=this.props.userinfo
        const plainOptions = this.props.role.role ? this.props.role.role : this.getRole()
        const college = this.props.college.college ? this.props.college.college : this.getcollege()
        const props = college
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
        let collegeList = {}
        if (college !== undefined) {
            collegeList = college.map(v =>
                <Option key={v.id}>{v.name}</Option>
            )
        }
        let roleList = <Col></Col>
        if (plainOptions !== undefined) {
            roleList = plainOptions.map(v => {
                return <Checkbox key={v.id} value={v.id}>{v.name}</Checkbox>
            }
            )
        }
        const main = (
            <div >
                <Form {...formItemLayout} {...props} onSubmit={this.handleSubmit} onChange={this.handlChange}>
                    <Form.Item
                        label={
                            <span>
                                昵称&nbsp;
              </span>
                        }
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入昵称', whitespace: true }],
                            initialValue:userinfo.name
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
                            initialValue:userinfo.username
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
                                // initialValue: userinfo.role.map(v=>v.id)
                            })(<Checkbox.Group style={{ width: '100%' }}>
                                {roleList}
                            </Checkbox.Group>)
                        }
                    </FormItem>
                    <Form.Item label="学院">
                        {getFieldDecorator('college', {
                            rules: [{ required: true, message: 'Please select your gender!' }],
                            initialValue:userinfo.college
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
                    <Form.Item label="密码">
                            {getFieldDecorator('reset', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>
                                重置密码
                                </Checkbox>,
                            )}
                    </Form.Item>
                </Form>
            </div>)
        return (
            <div>             
                <Modal
                    title="修改用户"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.props.handleCancel}
                >
                    {main}
                </Modal>
            </div>
        )
    }
}
const UserEdit = Form.create(
)(UserEditCompent)
export default UserEdit