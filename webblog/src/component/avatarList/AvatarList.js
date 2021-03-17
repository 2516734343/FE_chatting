import React, { Component } from 'react'
import { Avatar, Tooltip } from 'antd';
export default class AvatarList extends Component {
  render() {
    return (
      <div>
        <Avatar.Group>{
          this.props.avatarList.map(item => {
            return <Tooltip title={item.name} placement="top">
              <Avatar src={item.photo} >{item.name}</Avatar>
            </Tooltip>
          })
        }</Avatar.Group>
      </div>
    )
  }
}
