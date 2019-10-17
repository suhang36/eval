import React from 'react'
import { Form, Button, Input,message } from 'antd'
import Axios from 'axios';
let id = 0;
class TargetAddFromCompent extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log(values.indexName)
                Axios({
                  url:'/insertIndexF',
                  method:'post',
                  params:{
                    name:values.indexName,
                    pid:this.props.pid
                  }
                }).then(res=>{
                  if(res.data===1){
                    message.success('添加成功')
                  }else{
                    message.error('添加失败')
                  }
                })
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
            {getFieldDecorator('indexName', {rules: [{ required: true, message: '请输入' }],})(<Input />)}
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