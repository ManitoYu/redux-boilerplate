import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Responder from '../Responder'
import { rectMake } from '../Shortcuts'

export default class View extends Responder {
  static defaultProps = {
    frame: rectMake(null, null, null, null),
    clipsToBounds: false,
    isHidden: false,
    gestureRecognizers: []
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
    gestureRecognizers: PropTypes.array
  }

  render() {
    const { children, className, clipsToBounds, isHidden, x, y, width, height } = this.props

    let style = {}

    // frame
    if (width) style.width = `${width}px`
    if (height) style.height = `${height}px`
    if (x) style.left = `${x}px`
    if (y) style.top = `${y}px`

    // others
    if (clipsToBounds) style.overflow = 'hidden'
    if (isHidden) style.display = 'none'

    return (
      <Responder {...this.props}>
        <div className={classnames('View', className)} style={style}>
        {children}
        </div>
      </Responder>
    )
  }
}
