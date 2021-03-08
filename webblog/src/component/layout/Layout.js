import React, { Component } from 'react'
import css from './Layout.less';
import LeftView from '../content/left/Left'
import RightView from '../content/right/Right';
export default class Layout extends Component {
    render() {
        return (
            <div className={css.content}>
                <div className={css.left}>
                    <LeftView/>
                </div>
                <div className={css.main}>
                    {this.props.children}
                </div>
                <div className={css.right}>
                    <RightView/>
                </div>
            </div>
        )
    }
}
