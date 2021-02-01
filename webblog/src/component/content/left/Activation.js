import React, { Component } from 'react'
import './Left.css';
// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts';
// import ReactEcharts from 'echarts-for-react';
//下面是按需加载
// import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/bar'
// import ReactEcharts from 'echarts-for-react';

export default class Activation extends Component {
    constructor(props) {
        super(props);
        this.textInput = null;

        this.setTextInputRef = element => {
          this.textInput = element;
        };
    }
    // getOption =()=> {
    //     let option = {
    //       title:{
    //         text:'用户骑行订单',
    //         x:'center'
    //       },
    //       tooltip:{
    //         trigger:'axis',
    //       },
    //       xAxis:{
    //         data:['周一','周二','周三','周四','周五','周六','周日']
    //       },
    //       yAxis:{
    //         type:'value'
    //       },
    //       series:[
    //         {
    //           name:'OFO订单量',
    //           type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
    //           data:[1000,2000,1500,3000,2000,1200,800]
    //         }
    //       ]
    //     }
    //    return option
    //   }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('activeTable'));
        console.log(myChart);
        // 绘制图表
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
            // xAxis: {
            //     type: 'category',
            //     boundaryGap: false,
            //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            // },
            // yAxis: {
            //     type: 'value'
            // },
            // series: [{
            //     data: [820, 932, 901, 934, 1290, 1330, 1320],
            //     type: 'line',
            //     areaStyle: {}
            // }]
        console.log(myChart);
    }
    // setTextInputRef(element) {

    //     if (element) {
    //       // 基于准备好的dom，初始化echarts实例
    //       const dom = element
    //       var myChart = echarts.init(dom)
    //       // 绘制图表
    //       myChart.setOption({
    //         title: { text: 'ECharts 入门示例' },
    //         tooltip: {},
    //         xAxis: {
    //           data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //         },
    //         yAxis: {},
    //         series: [{
    //           name: '销量',
    //           type: 'bar',
    //           data: [5, 20, 36, 10, 10, 20]
    //         }]
    //       })
    //     }
    //   };
    render() {
        // console.log(this.getOption);
        return (
            <div className="activation">
                用户周活跃度
                <div id='activeTable'>
                {/* <ReactEcharts
                    option={this.getOption()}
                    style={{height: '100%', width: '100%'}}
                    /> */}
                </div>
            </div>
        )
    }
}
