import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class Divider extends Component {
  render() {
    const { className, style } = this.props

    return (
      <div className={classnames('Divider', className)} style={style}>
        <div></div>
        <div></div>
      </div>
    )
  }
}

Divider.contextTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}