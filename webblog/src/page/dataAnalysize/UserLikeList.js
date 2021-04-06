import React, { Component } from 'react'
import { getLikeTopList, getTextKeyWords } from '@/remote';

export default class UserLikeList extends Component {
  state = {
    hotList: [],
    loaded: false,
    dataAxis: [],
  }
  async componentDidMount() {
    await this.getTopFiveList();
  }
  getTopFiveList = async () => {
    try {
      const resp = await getLikeTopList({});
      if (resp.status === 200) {
        let str = '';
        this.setState({
          hotList: resp.data.list || [],
          dataAxis: resp.data.list.map(item => item.content)
        })
      }
    } catch (e) {

    } finally {
      this.setState({
        loaded: true
      });
    }

  };
  render() {
    return (
      <div>

      </div>
    )
  }
}
