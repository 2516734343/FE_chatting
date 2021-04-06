import React, { Component } from 'react'
import './Header.css';
import { Col, Row, Input, Avatar, Dropdown, Menu, Button, Tooltip, message, Select, List, Empty } from 'antd';
import { EnvironmentOutlined, CloudTwoTone, SkinTwoTone, AntDesignOutlined, SearchOutlined, AreaChartOutlined, UserAddOutlined, EnvironmentTwoTone } from '@ant-design/icons/lib/icons';
import { getUserInfo, searchUsers } from '@/remote';
import { loginout } from '@/remote';
import RouteConfig from '../../routeConfig';
import AddUserModal from '@/component/addUserModal/AddUserModal';
import { withRouter } from 'react-router';

const { Search } = Input;
const { Option } = Select;
const AMap = window.AMap;
class Header extends Component {
    state = {
        userInfo: {},
        userList: [],
        showBox: false,
        loading: false,
        search: '',
        selectedKeys: '',
        city: '',
        weather: '',
    };
    componentDidMount = () => {
        this.getUserInfos();
        this.getCity();

    };
    getUserInfos = async () => {
        const userId = window.localStorage.getItem('userId');
        try {
            const resp = await getUserInfo({ userId: +userId });
            if (resp.status === 200) {
                this.setState({
                    userInfo: Object.assign({}, resp.data)
                });
            }

        } catch (e) {

        } finally {
            this.setState({
                loading: true
            });
        }
    };
    loginOut = async () => {
        const resp = await loginout({ username: this.state.userInfo.username });
        if (resp.status === 200) {
            message.success('退出登录成功');
            window.localStorage.clear();
            this.props.history.push(RouteConfig.login);
        }
    };
    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    searchUsers = async () => {
        this.setState({
            showBox: true
        })
        try {
            const resp = await searchUsers({ search: this.state.search });
            if (resp.status === 200) {
                this.setState({
                    userList: resp.data.list || []
                })
            }
        } catch (e) {

        } finally {
            this.setState({
                loading: true
            })
        }
    }
    hideBox = () => {
        this.setState({
            showBox: false,
        })
    }
    adduser = (e, userId) => {
        this.refs.addUserModal.showModal(true, userId);
    }
    changeSkin = (item, key) => {
        this.setState({
            selectedKeys: item.key
        });
        this.props.changeSkin(item.key);
    };
    getCity = () => {
        let mapObj = null;
        const self = this;
        mapObj = new AMap.Map('iCenter');
        mapObj.plugin('AMap.Geolocation', function () {
            const geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            mapObj.addControl(geolocation);
            geolocation.getCurrentPosition(function (status, result) {
                if (status === 'complete') {
                    self.setState({
                        city: result.addressComponent.province
                    });
                    self.getWeather(result.addressComponent.province);
                }
            });
        })
    };

    // 获取天气信息
    getWeather = (city) => {
        //加载天气查询插件
        const self = this;
        AMap.plugin('AMap.Weather', function () {
            //创建天气查询实例
            var weather = new AMap.Weather();
            //执行实时天气信息查询
            weather.getLive(city, function (err, data) {
                self.setState({
                    weather: data.weather
                });
            });
        });
    };
    render() {
        const userId = +window.localStorage.getItem('userId');
        return (
            <div className="header">
                <div className="headerBox">
                    <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Col span={2} className="col">
                            <div className="logo">
                                <span><AntDesignOutlined style={{ color: '#1890ff', fontSize: '20px' }} /></span>
                                <span className="logoName">趣聊</span>
                            </div>
                        </Col>
                        <Col span={7} className="info" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="divs">
                                <EnvironmentTwoTone style={{ fontSize: '18px' }} twoToneColor="#7BB066" />
                                <span>{this.state.city}</span>
                            </div>
                            <div className="divs">
                                <CloudTwoTone style={{ fontSize: '18px' }} twoToneColor="#67BDE9" />
                                <span>{this.state.weather}</span>
                            </div>
                            <div className="divs">
                                <SkinTwoTone style={{ fontSize: '18px' }} twoToneColor="#eb2f96" />
                                <Dropdown overlay={
                                    <Menu onClick={(item, key) => { this.changeSkin(item, key) }}
                                    >
                                        <Menu.Item key={'blint'}>蓝色流星</Menu.Item>
                                        <Menu.Item key={'black'}>暗黑星空</Menu.Item>
                                        <Menu.Item key={'girl'}>雨后天空</Menu.Item>
                                        <Menu.Item key={'flower'}>一束碎花</Menu.Item>
                                        <Menu.Item key={'spring'}>粉色桃花</Menu.Item>
                                        <Menu.Item key={'katong'}>可爱卡通</Menu.Item>
                                    </Menu>
                                } placement="bottomCenter">
                                    <span>换肤</span>
                                </Dropdown>
                            </div>
                            {
                                (userId === 1 || userId === 5) &&
                                <div className="divs">
                                    <AreaChartOutlined style={{ fontSize: '18px', color: '#365D89' }} />
                                    <span onClick={() => { window.location.href = window.origin + RouteConfig.dataAnalysize }}>数据中心</span>
                                </div>
                            }
                        </Col>
                        <Col span={8} className="search_col">
                            <div className="search_box">
                                <Input placeholder={'请输入用户名 / 昵称'}
                                    style={{ width: '400px', height: '36px', borderRadius: '4px' }}
                                    suffix={<SearchOutlined style={{ color: '#898a8c' }} />}
                                    onPressEnter={this.searchUsers}
                                    onChange={this.handleChange} />
                                {this.state.showBox && <div className="searchResult" onMouseLeave={this.hideBox}>
                                    {this.state.userList.length > 0 ?
                                        <List itemLayout="horizontal"
                                            dataSource={this.state.userList}
                                            renderItem={item => (
                                                <List.Item
                                                    actions={[<Button icon={<UserAddOutlined style={{ color: '#1890ff' }} />}
                                                        className="addUser" onClick={e => { this.adduser(e, item.userId) }} />]}
                                                >
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar src={item.photo} />
                                                        }
                                                        title={<span>{item.name}</span>}
                                                        description={<span className="user_note">{item.signature}</span>}
                                                    />
                                                </List.Item>
                                            )}>
                                        </List>
                                        : <div style={{ paddingBottom: '20px' }}>
                                            <Empty
                                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                description={
                                                    <span style={{ fontSize: '12px' }}>
                                                        暂无搜索结果
                                                </span>
                                                }
                                            >
                                            </Empty>
                                        </div>

                                    }
                                </div>
                                }
                            </div>
                        </Col>
                        <Col span={3} offset={4}>
                            <Avatar src={this.state.userInfo.photo} />
                            <span style={{ marginLeft: '5px' }}>{this.state.userInfo.name}</span>
                            <Button
                                onClick={this.loginOut}
                                style={{ marginLeft: '5px', color: '#252626' }}
                                type={'link'}>
                                退出</Button>
                        </Col>
                    </Row>
                </div>
                <AddUserModal ref={'addUserModal'} />
            </div>
        )
    }
}

export default withRouter(Header);
