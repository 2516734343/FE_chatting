import React, { Component } from 'react'
import css from './DataAnalysize.less';
import { getColors, getTagColors, getFontsize } from '@/utils/TagColor';
import { getTagUserList } from '@/remote';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import {
  PieChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
);

export default class UserTags extends Component {
  state = {
    tagList: [
      // { name: '互联网民工', value: 2 },
      // { name: '打工人', value: 2 },
      // { name: '音乐控', value: 2 },
      // { name: '二次元', value: 2 },
      // { name: '快乐水', value: 1 },
      // { name: '肥宅', value: 2 },
    ],
    loaded: false,
  }
  async componentDidMount() {
    await this.getTagList();
    this.getEcharts();
  }
  getTagList = async () => {
    try {
      const resp = await getTagUserList({});
      if (resp.status === 200) {
        this.setState({
          tagList: resp.data.list || []
        })
      }
    } catch (e) {

    } finally {
      this.setState({
        loaded: true
      })
    }
  }
  getEcharts = () => {
    var chartDom = document.getElementById('tagCharts');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '热门标签',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '25',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.state.tagList
        }
      ]
    };
    option && myChart.setOption(option);
  }
  render() {
    return (
      <div>
        {
          this.state.loaded &&
          <div id="tagCharts" style={{ width: '450px', height: '410px' }}></div>
        }
      </div>
    )
  }
}
