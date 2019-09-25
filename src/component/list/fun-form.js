import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
 
const FormItem = Form.Item;
//form代码，没有什么改进，把下面的提交按钮去掉就行
class NormalLoginForm extends Component {
 
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入功能名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="功能名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('img', {
            rules: [{ required: true, message: '可以在antd官网查询图标' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="图标名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('path', {
            rules: [{ required: true, message: '请输入path' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="路径" />
          )}
        </FormItem>
      </Form>
    );
  }
}
 
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
 
export default WrappedNormalLoginForm;