import React, { Component } from 'react';
import { observer } from 'mobx-react';
import url from 'url'; //引入url解析模块
import { getInvitationDetail } from '@/remote'
import css from './ActiveDetail.less';
@observer
class ActiveDetail extends React.Component {
    state = {
        detailInfo: {}
    }
    componentDidMount() {
        this.getDetail();
    }
    getDetail = async () => {
        const query = url.parse(this.props.location.search, true).query;
        const id = +query.id;
        if (!id) { return; }
        const resp = await getInvitationDetail({ invitationId: id });
        if (resp.status === 200) {
            this.setState({
                detailInfo: resp.data
            })
            console.log(this.state.detailInfo);
        }
    }
    render() {
        console.log(this.props, this.props.match.params.id);
        return <div className={css.detailPage}>详情页</div>
    }
}

export default ActiveDetail
