import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Responder from '../Responder'

export default class View extends Responder {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, width, height, className, clipsToBounds, onClick, isHidden } = this.props

    let style = {}
    if (width) style.width = `${width}px`
    if (height) style.height = `${height}px`
    if (clipsToBounds) style.overflow = 'hidden'
    if (isHidden) style.display = 'none'

    return (
      <div
        className={classnames('View', className)}
        style={style}
        onClick={onClick}>{children}</div>
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
  clipsToBounds: PropTypes.bool,
  isHidden: PropTypes.bool
}
