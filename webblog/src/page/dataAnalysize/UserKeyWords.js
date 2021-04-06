import React, { Component } from 'react'
import css from './DataAnalysize.less';
import { getColors, getTagColors, getFontsize } from '@/utils/TagColor';
import { getTagUserList } from '@/remote';
import {
  observer,
  inject
} from "mobx-react";
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import {
  ScatterChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [TooltipComponent, GridComponent, ScatterChart, CanvasRenderer]
);
@inject('Store')
@observer class UserKeyWords extends Component {
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
    // await this.getTagList();
    const self = this;
    setTimeout(() => {
      self.getEcharts();
    }, 1000)
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
    var chartDom = document.getElementById('keyWords');
    var myChart = echarts.init(chartDom, 'dark');
    var option;

    var data = this.props.Store.data;
    // console.log(data);

    option = {
      title: {
        text: '关键词权重和频率关系散点图'
      },
      color: '#dd4444',
      xAxis: {
        type: 'value',
        name: '权重',
        splitLine: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        name: '词频',
        splitLine: {
          show: false
        },
      },
      tooltip: {
        backgroundColor: ['rgba(255,255,255,0.7)'],
        formatter: function (obj) {
          var value = obj.value;
          return '关键词：' + value[2] + '<br/>' + '权重：' + value[0] + '<br/>' + '频率：' + value[1];

        }
      },
      series: [{
        symbolSize: 15,
        data: data,
        type: 'scatter'
      }]
    };
    option && myChart.setOption(option);

  }
  render() {
    return (
      // <div className={css.wrap}>
      //   <div className={css.cube}>
      //     {
      //       this.state.tagList.slice(0, 6).map((item, index) => {
      //         return <div className={css[`plane-${index}`]} style={{ color: `${getColors()}` }}>{item.name}</div>
      //       })
      //     }
      //   </div>
      // </div>
      <div id="keyWords" style={{ width: '400px', height: '534px', borderLeft: '1px solid #484752' }}>

      </div>
    )
  }
}


export default UserKeyWords;