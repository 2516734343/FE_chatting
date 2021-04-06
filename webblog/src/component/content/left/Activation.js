import React, { Component } from 'react'
import './Left.css';
// 引入 ECharts 主模块
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import {
    LineChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

import { getUserWeek } from '@/remote';
import moment from 'moment';

echarts.use(
    [TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]
);
export default class Activation extends Component {
    state = {
        data: [],
        loaded: false,
        date: [],
    }
    async componentDidMount() {
        await this.getTime();
        await this.getDatas();
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('activeTable'));
        // 绘制图表
        myChart.setOption({
            title: {
                // text: '周活跃度'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['点赞量', '评论量', '发帖量']
            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    // saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.date
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '点赞量',
                    type: 'line',
                    stack: '总量',
                    data: this.state.data.likeNum
                },
                {
                    name: '评论量',
                    type: 'line',
                    stack: '总量',
                    data: this.state.data.commentNum
                },
                {
                    name: '发帖量',
                    type: 'line',
                    stack: '总量',
                    data: this.state.data.releaseNum
                }
            ]
        })
    }
    getTime = async () => {
        let arr = [];
        for (let i = 6; i >= 0; i--) {
            await arr.push(moment().subtract('days', i).format('MM/DD'));
            this.setState({
                date: arr
            })
        }
    }
    getDatas = async () => {
        try {
            const resp = await getUserWeek({ userId: +window.localStorage.getItem('userId') });
            if (resp.status === 200) {
                this.setState({
                    data: resp.data || []
                })
            }
        } catch (e) {

        } finally {
            this.setState({
                loaded: true,
            })
        }
    }
    render() {
        return (
            <div className="activation">
                <div className="active-title">周活跃度</div>
                <div id='activeTable' />
            </div>
        )
    }
}
