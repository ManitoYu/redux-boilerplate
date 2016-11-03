import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Responder from '../Responder'

export default class View extends Responder {
  render() {
    const { children, width, height, className, clipsToBounds, isHidden, top, left } = this.props

    let style = {}
    if (width) style.width = `${width}px`
    if (height) style.height = `${height}px`
    if (clipsToBounds) style.overflow = 'hidden'
    if (isHidden) style.display = 'none'
    if (top) style.top = `${top}px`
    if (left) style.left = `${left}px`

    return (
      <Responder {...this.props}>
        <div className={classnames('View', className)} style={style}>
        {children}
        </div>
      </Responder>
    )
  }
}

View.defaultProps = {
  width: 0,
  height: 0,
  clipsToBounds: false,
  gestureRecognizers: []
}

View.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  clipsToBounds: PropTypes.bool,
  isHidden: PropTypes.bool,
  gestureRecognizers: PropTypes.array
}
