import React, { PropTypes } from 'react'
import View from '../View'
import classnames from 'classnames'
import {
  ControlStateNormal,
  ControlStateHighlighted,
  ControlStateSelected,
  ControlStateDisabled
} from './constants'

export default class Control extends View {
  static defaultProps = {
    enabled: true,
    highlighted: false,
    selected: false,
    state: ControlStateNormal
  }

  static propTypes = {
    enabled: PropTypes.bool,
    highlighted: PropTypes.bool,
    selected: PropTypes.bool,
    state: PropTypes.oneOf([
      ControlStateNormal,
      ControlStateHighlighted,
      ControlStateSelected,
      ControlStateDisabled
    ])
  }

  _handleFinalState() {
    const { state } = this.props

    if (state == ControlStateDisabled) return { 'is-disabled': true }
    if (state == ControlStateSelected) return { 'is-selected': true }
    if (state == ControlStateHighlighted) return { 'is-highlighted': true }
  }

  render() {
    const { children, className } = this.props

    const finalState = this._handleFinalState()

    return (
      <View className={classnames('Control', className, finalState)}>
        {children}
      </View>
    )
  }
}
