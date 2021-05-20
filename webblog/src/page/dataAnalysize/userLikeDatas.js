import React, { Component } from 'react';
import { getLikeTopList, getTextKeyWords } from '@/remote';
import { getKeyWords, getUrl } from '@/utils/userLikeDatas';
import { getInfos } from '@/utils/get';
import css from './DataAnalysize.less';
import { getColors, getTagColors, getFontsize } from '@/utils/TagColor';
import wordNumDatas from '@/keyWordNum.json';
import { resultData } from '@/resultData';
import {
    observable,
    computed,
    action
} from "mobx";
import {
    observer,
    inject
} from "mobx-react";
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    GridComponent,
    DataZoomComponent
} from 'echarts/components';
import {
    BarChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [TitleComponent, GridComponent, DataZoomComponent, BarChart, CanvasRenderer]
);

var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
var app = {};

let FormData = window.FormData;
let formdata = new FormData();
@inject('Store')
@observer class UserLikeDatas extends Component {
    state = {
        hotList: [],
        loaded: false,
        wordNumDatas: [], // 词频
        wordsWeightDatas: [], //关键词权重
        resultDatas: [], // 词频+关键词权重
        content: '',
        wordLoaded: false,
        chartsLoaded: false,
    }
    async componentDidMount() {
        await this.getTopFiveList();
        // this.getResultDatas();
        await this.getWordNumDatas();
        // await this.getKeyWordsDatas();
        this.getEcharts();
    }
    getTopFiveList = async () => {
        try {
            const resp = await getLikeTopList({});
            if (resp.status === 200) {
                let str = '';
                this.setState({
                    hotList: resp.data.list || [],
                })
                resp.data.list.forEach(item => {
                    str += item.content;
                });
                this.setState({
                    content: str
                })
            }
        } catch (e) {

        } finally {
            this.setState({
                loaded: true
            });
        }

    };
    getUrls = (baseUrl, data) => {
        let url = '';
        let dataStr = ""; // 数据拼接字符串
        Object.keys(data).forEach((key) => {
            dataStr += `${key}=${data[key]}&`;
        });
        if (dataStr !== "") {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
            url = `${baseUrl}?${dataStr}`;
        }
        return {
            dataStr: dataStr,
            url: url,
        }
    }
    getWordNumDatas = async () => {
        await this.getKeyWordsDatas();
        this.getResultDatas();
        return;
        let data = [];
        try {
            const reg = /^([0-9_-]|["',，.。/、\]\[【】\\n\s！!?？——_<>%;‘’；：)《（）》(&+=`“”·*#@@]){0,}$/;
            const appcode = 'f98fb0d210d248c192992ef782583cbd';
            const baseUrl = 'https://counter.market.alicloudapi.com/ai_market/ai_nlp/word_split_count/v1?STRING='
            this.state.hotList.forEach(item => {
                fetch(baseUrl + item.content, {
                    method: 'post',
                    headers: {
                        "Authorization": "APPCODE " + appcode,
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                }).then(res => {
                    res.json().then(resp => {
                        let result = resp['自然语言分析_词频统计分析实体信息'].map(it => {
                            return {
                                text: it['文本'],
                                length: +it['文本长度'],
                                count: +it['文本出现频次'],
                            }
                        })
                        result = result.filter(it => { // 过滤掉字符
                            return !reg.test(it.text)
                        });
                        result = result.filter(it => { // 过滤掉单个文字和频率<=1的词汇
                            return it.length > 1;
                        })
                        data = data.concat(result);
                        // data = data.sort((a, b) => {
                        //     return b.count - a.count
                        // }).slice(0, 19);
                        // console.log(data);
                        this.setState({
                            wordNumDatas: [...data].map(it => {
                                return {
                                    name: it.text,
                                    value: it.count
                                }
                            })
                        }, () => {
                            this.getKeyWordsDatas();
                            // this.getEcharts();
                            this.setState({
                                wordLoaded: true
                            })
                        });
                    })

                })
            })
        } catch (e) {

        } finally {

        }
    }
    getKeyWordsDatas = async () => {
        return;
        let data = [];
        const appcode = 'f98fb0d210d248c192992ef782583cbd';
        const baseUrl = 'http://gjccq.market.alicloudapi.com/rest/160601/text_analysis/key_words_extraction.json';
        this.state.hotList.forEach(item => {
            const params =
            {
                "inputs": [{
                    "text": {   // 表示文章内容，dataType为数据类型，dataValue是具体内容（UTF8编码）
                        "dataType": 50,  // 数据类型：1:bool 10:int32 20:int64 30:float 40:double 50:string
                        "dataValue": item.content
                    },
                    "config": { // 算法参数，用json序列化后的string表示
                        "dataType": 50,
                        "dataValue": "{\"topN\": 3, \"similarityType\": \"lcs\",\"delimiter\":\"。！？\"}"
                    }
                }]
            }
            fetch(baseUrl, {
                method: 'post',
                headers: {
                    "Authorization": "APPCODE " + appcode,
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(params)
            }).then(res => {
                res.json().then(resp => {
                    const result = JSON.parse(resp.outputs[0].outputValue.dataValue);
                    const wordsWeight = result['words weight'].map(it => {
                        return {
                            name: it.word,
                            value: it.weight,
                        }
                    })
                    data = data.concat(wordsWeight);
                    // console.log(data);
                    this.setState({
                        wordsWeightDatas: [...data]
                    }, () => {
                        this.getResultDatas();
                    });
                })
            })
        })
    }
    getResultDatas = () => {
        this.props.Store.setValue(resultData);
        return;
        let data = [];
        this.state.wordsWeightDatas.forEach(item => {
            const idx = wordNumDatas.findIndex(it => it.name === item.name);
            if (idx > -1) {
                data.push([Math.round(item.value * 10 * 100) / 100, wordNumDatas[idx].value, item.name])
            }
        });
        this.props.Store.setValue(data);
        // console.log(this.props.Store.data);
        // this.setState({
        //     resultDatas: [...data],
        // }, () => {
        //     this.props.Store.setValue(data);
        // })

    }
    getEcharts = () => {
        console.log('echarts');
        // const { wordNumDatas } = this.state;
        let datas = wordNumDatas.filter(it => { // 过滤掉单个文字和频率<=1的词汇
            return it.value > 1;
        });
        const data = datas.map(it => it.value).slice(0, 19)
        const dataAxis = datas.map(it => it.name).slice(0, 19)
        var chartDom = document.getElementById('keyWordsBar');
        var myChart = echarts.init(chartDom);
        var yMax = 500;
        var dataShadow = [];

        for (var i = 0; i < datas.length; i++) {
            dataShadow.push(yMax);
        }

        var option = {
            title: {
                text: '点赞帖子关键词',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    return params[0].axisValue + " " + data[params[0].dataIndex];

                }
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                {
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ]
                        )
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ]
                            )
                        }
                    },
                    data: data
                }
            ]
        };

        // Enable data zoom when user click bar.
        var zoomSize = 6;
        myChart.on('click', function (params) {
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });

        option && myChart.setOption(option);
        console.log(myChart);
    }
    render() {
        return (
            <div style={{
                display: 'flex',
            }}>
                <div style={{ flex: 1 }}>
                    {
                        <div id="keyWordsBar" style={{ width: '900px', height: '470px', paddingTop: '5px' }}></div>
                    }
                </div>

                {/* 点赞关键词提取 */}
                <div style={{
                    borderLeft: '1px solid #484752',
                    flex: 1
                }}>
                    {
                        // this.state.wordLoaded &&
                        <div className={css.wordCloud}>
                            {
                                wordNumDatas.map(item => {
                                    return <span style={{ color: `${getColors()}`, fontSize: `${getFontsize()}` }} className={css.word}>{item.name}</span>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default UserLikeDatas;
