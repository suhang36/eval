import React from 'react'
import { Icon, Form, Radio, Button, Input,InputNumber } from 'antd'
let id = 0;
class TargetAddFromCompent extends React.Component {
    // constructor(props){
    //     super(props)
    // }
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

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
          const formItemLayoutOnLabel={
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12,offset:3},
              },
          }
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutOnLabel)}
                label={index === 0 ? '选项' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`option[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请输入选项",
                        },
                    ],
                })(<Input placeholder="请输入" style={{ width: '60%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        
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
            <Form.Item label="权重">
                    {getFieldDecorator('input-number', { initialValue: 0.1})(<InputNumber min={0} max={1} />)}
                </Form.Item>
                {formItems}
                <Form.Item {...formItemLayoutOnLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加选项
                </Button>
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
const TargetAddFrom = Form.create()(TargetAddFromCompent);
export default TargetAddFrom