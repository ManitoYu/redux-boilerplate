import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class Button extends Component {
  render() {
    const { children, onClick, style, className } = this.props

    return (
      <button
        className={classnames('Button', className)}
        style={style}
        onClick={onClick}>{children}</button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
}
