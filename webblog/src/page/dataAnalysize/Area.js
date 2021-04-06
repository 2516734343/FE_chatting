import React, { Component } from 'react';
import css from './DataAnalysize.less';
import { Switch } from 'antd';
import { getUsersArea, getLocation } from '@/remote';
import * as echarts from 'echarts/core';
import Bmap from 'echarts/extension/bmap/bmap';
import UserKeyWords from './UserKeyWords';
import {
    TitleComponent,
    TooltipComponent
} from 'echarts/components';
import {
    ScatterChart,
    EffectScatterChart,
    CustomChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [TitleComponent, TooltipComponent, ScatterChart, EffectScatterChart, CustomChart, CanvasRenderer]
);

export default class Area extends Component {
    state = {
        areaList: [],
        geoCoordMap: {},
        isDark: false,
    };
    componentDidMount() {
        const self = this;
        this.getUsersAreas().then(() => {
            this.getLocation();
        }).then(() => {
            setTimeout(() => {
                self.getAreasDatas();
            }, 300)

        })
    }
    onChange = (checked) => {
        this.setState({
            isDark: checked
        });
    }

    getUsersAreas = async () => {
        const resp = await getUsersArea({});
        if (resp.status === 200) {
            this.setState({
                areaList: resp.data.list.map(item => {
                    return {
                        name: item.name.split(' ')[1],
                        value: item.value
                    }
                })
            })
        }
    };
    getLocation = () => {
        const obj = {};
        this.state.areaList.forEach(async (item) => {
            const url = 'https://restapi.amap.com/v3/geocode/geo?key=e335af8f89f7e1e90e2bec14c2149ebf&address=' + item.name;
            const res = await fetch(url, {
                method: 'get',
                mode: 'cors'
            });
            res.json().then(resp => {
                if (resp.status === '1') {
                    obj[item.name] = resp.geocodes[0].location.split(',').map(item => Number(item));
                    this.setState({
                        geoCoordMap: obj
                    });
                }
            });
        });
    };
    convertData = (data) => {
        var res = [];
        const { geoCoordMap } = this.state;
        for (var i = 0; i < data.length; i++) {
            var key = data[i].name;
            if (key) {
                res.push({
                    name: key,
                    value: geoCoordMap[key].concat(data[i].value)
                });
            }
        }
        return res;
    };
    getAreasDatas = () => {
        const data = this.state.areaList;
        // const them = this.state.isDark;
        var chartDom = document.getElementById('area');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            title: {
                text: '用户地区分布',
                subtext: '',
                sublink: '',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            bmap: {
                center: [116.407526, 39.90403],
                zoom: 5,
                roam: true,
                mapStyle: {
                    styleJson: [{
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "#044161"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#0F0D28"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#064f85"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#00508b"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#029fd4"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "all",
                        "stylers": {
                            "color": "#1a5787"
                        }
                    },
                    {
                        "featureType": "label",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    }]
                }
            },
            series: [
                {
                    name: '人数',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: this.convertData(data),
                    symbolSize: function (val) {
                        return val[2] / 0.1;
                        // return val[2] / 10;
                    },
                    encode: {
                        value: 2
                    },
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    itemStyle: {
                        color: '#ddb926'
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
            ]
        };
        option && myChart.setOption(option);

    };
    render() {
        return (
            <div className={css.area}>
                {/* <div className={css.title}>用户地区分布</div> */}
                <div id='area' style={{ width: '900px', height: '520px', margin: '7px 0px' }} />
                <UserKeyWords />
            </div>

        );
    }
}

