import React, { Component } from 'react';
import { withRouter } from "react-router";
import css from './DataAnalysize.less';
import Area from './Area';
import UserLikeDatas from './userLikeDatas';
import UserActive from './UserActive';
import UserTags from './UserTags';
import { Divider } from 'antd';

class DataAnalysize extends Component {
    render() {
        return (
            <div className={css.dataAnalysizePage}>
                <div className={css.header}>
                    用户数据监测中心
                </div>
                <div className={css.content}>
                    <div className={css.left}>
                        <div className={css.userActive}>
                            <UserActive style={{ color: '#ffff' }} />
                        </div>
                        <div className={css.userTags}>
                            <UserTags />
                        </div>
                    </div>
                    <div className={css.middle}>
                        <div className={css.userAera}>
                            <Area />
                        </div>
                        <div>
                            <UserLikeDatas />
                        </div>
                    </div>
                    {/* <div className={css.right}>
                    <div className={css.wordClouds}>
                         
                         词云
                  
                 </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default withRouter(DataAnalysize);
