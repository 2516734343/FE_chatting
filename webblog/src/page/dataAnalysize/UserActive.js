import React, { Component } from 'react'
import css from './DataAnalysize.less';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
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
import { Input } from 'antd';

echarts.use(
  [TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]
);
export default class UserActive extends Component {
  state = {
    data: [],
    loaded: false,
    date: [],
    targetUser: '',
  }
  async componentDidMount() {
    await this.getTime();
    await this.getDatas();
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
      const params = this.state.targetUser ? { username: this.state.targetUser } : { userId: +window.localStorage.getItem('userId') }
      const resp = await getUserWeek(params);
      if (resp.status === 200) {
        this.setState({
          data: resp.data || []
        }, () => {
          this.getEcharts();
        })
      }
    } catch (e) {

    } finally {
      this.setState({
        loaded: true,
      })
    }
  }
  getEcharts = () => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('activeCharts'), );
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
  handleChange = (e) => {
    this.setState({
      targetUser: e.target.value
    })
  }
  render() {
    return (
      <div className={css.active}>
        <div>
          <Input value={this.state.targetUser}
            onChange={this.handleChange}
            suffix={<SearchOutlined style={{ color: '#898a8c' }} />}
            style={{ width: '300px', borderRadius: '4px' }}
            onPressEnter={this.getDatas}
            placeholder={'请输入要查询的用户名'} />
        </div>
        <div className={css.title}>周活跃度</div>
        <div id='activeCharts' style={{ width: '400px', height: '450px' }} />
      </div>
    )
  }
}
