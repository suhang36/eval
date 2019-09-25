import React from 'react';
import { Form, Icon, Input, Button } from 'antd'


class LoginContainer extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form  className="login-form" onSubmit={this.props.onSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              onChange={this.props.onchanges}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='用户名'
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              onChange={this.props.onchanges}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder='密码'
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>         
        </Form.Item>
      </Form>
    );
  }
}

const LoginComponent = Form.create()(LoginContainer);
export default LoginComponent