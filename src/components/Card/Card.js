import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class Card extends Component {
  render() {
    const { children, className, style } = this.props

    return (
      <div className={classnames('Card', className)} style={style}>
      {children}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
}
