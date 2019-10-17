import React from 'react'
import { Icon, Form, Radio, Button, Input,InputNumber,message } from 'antd'
import Axios from 'axios';
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
                console.log(JSON.stringify(values,null,2))
                let data={}
                data.name=values.indexName
                data.weight=values.weight
                let op=[];
                for(let i=0;i<values.option.length;i++){ 
                    let option={}
                    option.name=values.option[i]
                    option.fraction=values.optionscore[i]
                    // console.log(option)
                    op[i]=option
                    data.id=this.props.id
                }
                data.option=op
                console.log(JSON.stringify(data,null,2))
                Axios({
                    url:'/insertIndex',
                    method:'post',
                    data:{
                        ...data
                    }
                }).then(v=>{
                        message.success('添加成功')
                })
                // Axios({
                //     url:'/insertIndexF',
                //     method:'post',
                //     params:{
                //       name:values.indexname,
                //       id:this.props.pid
                //     }
                //   }).then(res=>{
                //     if(res.data===1){
                //       message.success('添加成功')
                //     }else{
                //       message.error('添加失败')
                //     }
                //   })
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
            <div>
            <Form.Item
            {...formItemLayout}
                label={'选项'}
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
                })(<Input placeholder="选项名" style={{ width: '60%', marginRight: 8 }} />)}
                </Form.Item>
                <Form.Item
                {...formItemLayout }
                    label={'权重'}
                    required={false}
                    key={k}
                >
                {getFieldDecorator(`optionscore[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请输入权重",
                        },
                    ],
                })(<InputNumber placeholder='权重' min={1} max={100} style={{ width: '60%', marginRight: 8 }} />)}
                
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
            </div>
        ));
        
        return (<div>
            <Form onSubmit={this.handleSubmit} {...formItemLayout} style={{ marginTop: 20 }}>
            <Form.Item label="指标名">
            {getFieldDecorator('indexName', {
                rules: [
                {
                    required: true,
                    message: '请输入指标名',
                },
                ],
            })(<Input />)}
            </Form.Item>
            <Form.Item label="权重">
                    {getFieldDecorator('weight', { initialValue: 0.1,rules: [
                {
                    required: true,
                    message: '权重',
                },
                ],})(<InputNumber min={0} max={1} />)}
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