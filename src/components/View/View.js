import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Responder from '../Responder'

export default class View extends Responder {
  static defaultProps = {
    clipsToBounds: false,
    isHidden: false,
    gestureRecognizers: [],
    position: '',
    style: {},
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isUserInteractionEnabled: true
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    clipsToBounds: PropTypes.bool,
    isHidden: PropTypes.bool,
    gestureRecognizers: PropTypes.array,
    position: PropTypes.string,
    style: PropTypes.object,
    isUserInteractionEnabled: PropTypes.bool
  }

  render() {
    const {
      children,
      className,
      clipsToBounds,
      isHidden,
      position,
      style,
      x,
      y,
      width,
      height,
      isUserInteractionEnabled
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
    if (! isUserInteractionEnabled) finalStyle.pointerEvents = 'none'

    return (
      <Responder {...this.props}>
        <div className={classnames('View', className)} style={finalStyle}>
          {children}
        </div>
      </Responder>
    )
  }
}
