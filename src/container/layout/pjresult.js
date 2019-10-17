import React from 'react'
import Axios from 'axios';
import {Card, Select,Input, Col, Row, Table,Button, message} from 'antd'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
  } from "bizcharts";
  const { Option } = Select;
const { Search } = Input;
class Pjresult extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mapbatch:'',
            batch:[],
            olddata: [
              ],
              oldcols : {
                month: {
                  alias: "学期"
                },
                acc: {
                  alias: "分数"
                }
              },
            data:[
            ]
        }
    }
    handlemapbatch=()=>{
        if(this.state.mapbatch===''){
        }else{
            let is=parseInt(this.state.mapbatch)

            Axios({
                url:'/scorepaihang',
                method:'post',
                params:{
                    batch:is
                }
            }).then(res=>{
                let ok=[]
                for(let i=0;i<res.data.data.length;i=i+2){
                    
                    let o={}
                    let s=i+1
                    o.month=res.data.data[i]
                    o.acc=parseInt(res.data.data[s])
                    ok[i/2]=o
                }
                this.setState({
                    olddata:ok
                })
            })
        }
    }
    componentDidMount(){
        this.fetch()
    }
    fetch=()=>{
        Axios({
            url: '/getBatch',
            method: 'post',
            type: 'json'
        }).then(res => {
            this.setState({
                batch: res.data
            })
        })
        Axios({
            url:'/getpjtj',
            method:'get'
        }).then(res=>{
            this.setState({
                data:res.data.pjtj
            })
        })
    }
    handlesearch=(ms)=>{
        Axios({
            url:"/getpjtjexa",
            method:'post',
            params:{
                exa:ms
            }
        }).then(res=>{
            console.log(JSON.stringify(res.data.pjtjexa,null,2))
            this.setState({
                data:res.data.pjtjexa
            })
        })
    }
    render(){
        const columns = [
            {
              title: '教师名',
              dataIndex: 'uname',
              key: 'uname',
            },
            {
              title: '学院',
              dataIndex: 'cname',
              key: 'cname',
            },
            {
                title:'分数',
                dataIndex:'fraction',
                key:'fraction',
                sorter: (a, b) => a.fraction - b.fraction,
            }
        ]
        return <div>
        <div style={{ padding: 24, background: '#fff', marginTop: 32 }}>
            
            <Card bordered={false} title="评教统计">
            <Row>
                <Col span={6}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="过滤批次"
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.state.batch.map(v => {
                                                    return <Option value={v.name}>{v.name}</Option>
                                                })}
            </Select>
            </Col>
            <Col span={6}>
            <Select
                showSearch
                style={{ width: 200}}
                placeholder="过滤类型"
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="jack">学生评价</Option>
                <Option value="lucy">同行评价</Option>
                <Option value="tom">自评</Option>
            </Select>
            </Col>
            <Col span={6}>
            <Search onSearch={this.handlesearch} placeholder="查询老师"  enterButton />
            </Col>
            <Col style={{marginTop:20}} span={24}>
            <Table columns={columns} dataSource={this.state.data} />
            </Col>
            </Row>
            </Card>
        </div>
        <div style={{ padding: 24, background: '#fff', marginTop: 32 }}>
            <Card bordered={false} title="评教统计">
                <Select
                    showSearch
                    onChange={v=>this.setState({mapbatch:v})}
                    style={{ width: 200 }}
                    placeholder="选择批次"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                   {this.state.batch.map(v => {
                                                    return <Option value={v.id}>{v.name}</Option>
                                                })}
                </Select>
                <Button type="primary" 
                onClick={this.handlemapbatch}
                style={{marginLeft:5}}
                    >
                    查询
                </Button>
                <Chart height={400} data={this.state.olddata} scale={this.state.oldcols} forceFit>
          <Axis
            name="month"
            title={null}
            tickLine={null}
            line={{
              stroke: "#E6E6E6"
            }}
          />
          <Axis
            name="acc"
            line={false}
            tickLine={null}
            grid={null}
            title={null}
          />
          <Tooltip />
          <Geom
            type="line"
            position="month*acc"
            size={1}
            color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
            shape="smooth"
            style={{
              shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
              shadowBlur: 60,
              shadowOffsetY: 6
            }}
          />
        </Chart>
            </Card>
        </div>
        </div> 
    }
}

export default Pjresult