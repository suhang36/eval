import React from 'react'
import { Tabs,Descriptions,Collapse } from 'antd';
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
import Typography from 'antd/lib/typography/Typography';
import Axios from 'axios';
const { TabPane } = Tabs;
const {Panel}=Collapse;
class DataPager extends React.Component{
    constructor(props){
        super(props)
        this.state={
           allData: {
            "collegeName": "软件学院",
            "score": 62.66666793823242,
            "data": [
              {
                "score": 88,
                "name": "自测问卷"
              },
              {
                "score": 80,
                "name": "学生评价老师问卷"
              },
              {
                "score": 20,
                "name": "评价同行问卷"
              }
            ],
            "batch": "大一上学期"
          },
              cols : {
                sales: {
                  tickInterval: 20
                }
              },
              olddata: [
                {
                  "score": "62.666668",
                  "name": "大一上学期"
                },
                {
                  "score": "100.0",
                  "name": "大一下学期"
                },
                {
                  "score": "75.0",
                  "name": "大二上学期"
                }
              ],
              oldcols : {
                name: {
                  alias: "学期"
                },
                score: {
                  alias: "分数"
                }
              },
        }
    }
    callback=(key)=> {
      console.log(key);
    }
    componentDidMount(){
      this.fetch()
    }
    fetch=()=>{
      Axios({
        url:'/selectScoreTeacher',
        method:'post',
        params:{
          name:sessionStorage.getItem('username')
        }
      }).then(res=>{
        let data=res.data.data.map(item=>{
          item.score=parseInt(item.score)
          return item
        })
        this.setState({olddata:data})
      })
      Axios({
        url:'/getquestiontypetj',
        method:'post',
        params:{
          username:sessionStorage.getItem('username')
        }
      }).then(res=>{
        console.log(JSON.stringify(res.data,null,2))
        this.setState({
          allData:res.data
        })
      })
    }
    
    render(){
        return <div
                style={{ padding: 24, background: '#fff', marginTop: 32 }}
        ><Tabs defaultActiveKey="1">
        <TabPane tab="本期评教统计" key="1">
        <Descriptions title="本期总概">
            <Descriptions.Item label="姓名">{sessionStorage.getItem('username')}</Descriptions.Item>
            <Descriptions.Item label="系别">{this.state.allData.collegeName}</Descriptions.Item>
            <Descriptions.Item label="总分数">{parseInt(this.state.allData.score)}</Descriptions.Item>
            <Descriptions.Item label="学期">{this.state.allData.batch}</Descriptions.Item>
        </Descriptions>
        <Typography style={{fontSize:16,fontWeight:'bold',marginBottom:12,color:'black'}}>详细统计:</Typography>
              <Chart height={400} data={this.state.allData.data} scale={this.state.cols} forceFit>
              <Axis name="name" />
              <Axis name="score" />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="interval" position="name*score" />
            </Chart>
        
        </TabPane>
        <TabPane tab="历史统计" key="2">
        <Descriptions title="本期总概">
            <Descriptions.Item label="姓名">{sessionStorage.getItem('username')}</Descriptions.Item>
        </Descriptions>
        <Typography style={{fontSize:16,fontWeight:'bold',marginBottom:12,color:'black'}}>往期记录:</Typography>
        <div>
        <Chart height={400} data={this.state.olddata} scale={this.state.oldcols} forceFit>
          <Axis
            name="name"
            title={null}
            tickLine={null}
            line={{
              stroke: "#E6E6E6"
            }}
          />
          <Axis
            name="score"
            line={false}
            tickLine={null}
            grid={null}
            title={null}
          />
          <Tooltip />
          <Geom
            type="line"
            position="name*score"
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
      </div>
        </TabPane>
      </Tabs></div>
    }
}
export default DataPager