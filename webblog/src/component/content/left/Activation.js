import React, { Component } from 'react'
import './Left.css';
// 引入 ECharts 主模块
import * as echarts from 'echarts/core';
import {
    ScatterChart
} from 'echarts/charts';
import {
    GridComponent
} from 'echarts/components';
import {
    LineChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [GridComponent, LineChart, CanvasRenderer]
);
echarts.use(
    [GridComponent, ScatterChart, CanvasRenderer]
);
export default class Activation extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('activeTable'));
        // 绘制图表
        myChart.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        })
    }
    render() {
        return (
            <div className="activation">
                <div className="active-title">周活跃度</div>
                <div id='activeTable'/>
            </div>
        )
    }
}
