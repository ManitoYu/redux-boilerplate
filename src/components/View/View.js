import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Responder from '../Responder'
import { rectMake } from '../Shortcuts'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { time } from 'core-decorators'

export default class View extends Responder {
  static defaultProps = {
    frame: rectMake(null, null, null, null),
    clipsToBounds: false,
    isHidden: false,
    gestureRecognizers: [],
    position: '',
    style: {}
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    frame: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    clipsToBounds: PropTypes.bool,
    isHidden: PropTypes.bool,
    gestureRecognizers: PropTypes.array,
    position: PropTypes.string,
    style: PropTypes.object
  }

  render() {
    const {
      children,
      className,
      clipsToBounds,
      isHidden,
      x,
      y,
      width,
      height,
      position,
      style
    } = this.props

    let finalStyle = { ...style }

    // frame
    if (width) finalStyle.width = `${width}px`
    if (height) finalStyle.height = `${height}px`
    if (x) finalStyle.left = `${x}px`
    if (y) finalStyle.top = `${y}px`

    // others
    if (clipsToBounds) finalStyle.overflow = 'hidden'
    if (isHidden) finalStyle.display = 'none'
    if (position) finalStyle.position = position

    return (
      <Responder {...this.props}>
        <div className={classnames('View', className)} style={finalStyle}>
          {children}
        </div>
      </Responder>
    )
  }
}
