import React from 'react'
import { Icon, Form, Radio, Button, Input,InputNumber } from 'antd'
let id = 0;
class TargetAddFromCompent extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };
    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span:3 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12},
            },
          };
          const formItemLayoutOnLabel = {
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12,offset:3},
            },
          };
        const { getFieldDecorator} = this.props.form;
        return (<div>
            <Form onSubmit={this.handleSubmit} {...formItemLayout} style={{ marginTop: 20 }}>
            <Form.Item label="指标名">
            {getFieldDecorator('indexName', {
                rules: [
                {
                    type: 'indexName',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ],
            })(<Input />)}
            </Form.Item>
                <Form.Item {...formItemLayoutOnLabel}>
                    <Button type="primary" htmlType="submit">
                        提交
                </Button>
                </Form.Item>
            </Form>
            </div>
            )
    }
}
const TargetAddFromFater = Form.create()(TargetAddFromCompent);
export default TargetAddFromFater