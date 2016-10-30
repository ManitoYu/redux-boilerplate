import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Control from '../Control'

export default class Button extends Control {
  render() {
    const { children, onClick, style, className, enabled } = this.props

    return (
      <button
        className={classnames('Button', className, { 'is-disabled': ! enabled })}
        style={style}
        onClick={onClick}>{children}</button>
    )
  }
}

Button.defaultProps = {
  enabled: true
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  enabled: PropTypes.bool
}
