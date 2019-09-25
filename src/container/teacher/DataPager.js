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
const { TabPane } = Tabs;
const {Panel}=Collapse;
class DataPager extends React.Component{
    constructor(props){
        super(props)
        this.state={
           allData: [
                {
                  year: "A",
                  population: 93
                },
                {
                  year: "B",
                  population: 73
                },
                {
                  year: "C",
                  population: 66
                },
                {
                  year: "D",
                  population:55
                },
              ],
              data : [
                {
                  year: "非常满意",
                  sales: 38
                },
                {
                  year: "满意",
                  sales: 52
                },
                {
                  year: "不满意",
                  sales: 61
                },
                {
                  year: "非常不满意",
                  sales: 145
                }
              ],
              cols : {
                sales: {
                  tickInterval: 20
                }
              },
              olddata: [
                {
                  month: "2019第一学期",
                  acc: 84.0
                },
                {
                  month: "2019第二学期",
                  acc: 14.9
                },
                {
                  month: "2019第三学期",
                  acc: 17.0
                },
                {
                  month: "2019第四学期",
                  acc: 20.2
                },
                {
                  month: "2019第五学期",
                  acc: 55.6
                }, 
              ],
              oldcols : {
                month: {
                  alias: "学期"
                },
                acc: {
                  alias: "分数"
                }
              },
        }
    }
    callback=(key)=> {
      console.log(key);
    }
    
    
    render(){
        return <div
                style={{ padding: 24, background: '#fff', marginTop: 32 }}
        ><Tabs defaultActiveKey="1">
        <TabPane tab="本期评教统计" key="1">
        <Descriptions title="本期总概">
            <Descriptions.Item label="姓名">李郑源</Descriptions.Item>
            <Descriptions.Item label="系别">软件学院</Descriptions.Item>
            <Descriptions.Item label="总分数">94.4</Descriptions.Item>
            <Descriptions.Item label="学期">2019第一学期</Descriptions.Item>
        </Descriptions>
        <Typography style={{fontSize:16,fontWeight:'bold',marginBottom:12,color:'black'}}>详细统计:</Typography>
            <div style={{width:500,height:200}}>
                <Chart height={300} width={500} data={this.state.allData} forceFit>
                <Coord type="polar" innerRadius={0.1} />
                <Tooltip />
                <Legend
                    position="right"
                    offsetY={-30}
                    offsetX={-30}
                />
                <Geom
                    type="interval"
                    color="year"
                    position="year*population"
                    style={{
                    lineWidth: 1,
                    stroke: "#fff"
                    }}
                />
                </Chart>
            </div>
        <Typography style={{fontSize:16,fontWeight:'bold',marginBottom:12,color:'black'}}>详细统计:</Typography>
        <Collapse accordion onChange={this.callback}>
          <Panel header="上课认真" key="1">
            <div>
              <Chart height={400} data={this.state.data} scale={this.state.cols} forceFit>
                <Axis name="year" />
                <Axis name="sales" />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom type="interval" position="year*sales" color='sales' />
              </Chart>
            </div>
          </Panel>
          <Panel header="受欢迎程度" key="2">
            
          </Panel>
          <Panel header="This is panel header 3" key="3">
            
          </Panel>
        </Collapse>
        
        </TabPane>
        <TabPane tab="历史统计" key="2">
        <Descriptions title="本期总概">
            <Descriptions.Item label="姓名">李郑源</Descriptions.Item>
            <Descriptions.Item label="系别">软件学院</Descriptions.Item>
            <Descriptions.Item label="入职时间">2019-6</Descriptions.Item>
        </Descriptions>
        <Typography style={{fontSize:16,fontWeight:'bold',marginBottom:12,color:'black'}}>往期记录:</Typography>
        <div>
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
      </div>
        </TabPane>
      </Tabs></div>
    }
}
export default DataPager