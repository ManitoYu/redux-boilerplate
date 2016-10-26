import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class View extends Component {
  render() {
    const { children, width, height, className, clipsToBounds } = this.props

    let style = {}
    if (width) style.width = `${width}px`
    if (height) style.height = `${height}px`
    if (clipsToBounds) style.overflow = 'hidden'

    return (
      <div className={classnames('View', className)} style={style}>{children}</div>
    )
  }
}

View.defaultProps = {
  width: 0,
  height: 0,
  clipsToBounds: false
}

View.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  clipsToBounds: PropTypes.bool
}
