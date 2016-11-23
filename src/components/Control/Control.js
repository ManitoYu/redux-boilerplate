import React, { PropTypes } from 'react'
import View from '../View'
import classnames from 'classnames'
import {
  ControlStateNormal,
  ControlStateHighlighted,
  ControlStateSelected,
  ControlStateDisabled,
  ControlEventsTouchUpInside,
  ControlEventsTouchDown
} from './constants'
import {
  TapGestureRecognizer,
  PanGestureRecognizer
} from '../GestureRecognizer'
import {
  GestureRecognizerStatePossible,
  GestureRecognizerStateBegan,
  GestureRecognizerStateChanged,
  GestureRecognizerStateEnded
} from '../GestureRecognizer/constants'
import { set } from '../Shortcuts'

import { autobind, time } from 'core-decorators'

export default class Control extends View {
  static defaultProps = {
    enabled: true,
    highlighted: false,
    selected: false,
    state: ControlStateNormal,
    actions: []
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

  _actions = {}

  constructor(props) {
    super(props)

    this._actions = props.actions.reduce((o, a) => {
      const { type, action } = a.props
      return set(o, type, o[type] ? o[type].concat(action) : [action])
    }, {})
  }

  actions(controlEvent) {
    return [].concat(this._actions[controlEvent] || [])
  }

  _handleFinalState() {
    const { state } = this.props

    if (state == ControlStateDisabled) return { 'is-disabled': true }
    if (state == ControlStateSelected) return { 'is-selected': true }
    if (state == ControlStateHighlighted) return { 'is-highlighted': true }
  }

  @autobind
  _handleTap(g) {
    if (g.gestureState == GestureRecognizerStateEnded) {
      this.actions(ControlEventsTouchDown).forEach(action => action(g))
    }

    if (g.gestureState == GestureRecognizerStateEnded) {
      this.actions(ControlEventsTouchUpInside).forEach(action => action(g))
    }
  }

  @autobind
  _handlePan() {

  }

  render() {
    const { children, className } = this.props

    const finalState = this._handleFinalState()

    return (
      <View
        className={classnames('Control', className, finalState)}
        gestureRecognizers={[
          <TapGestureRecognizer action={this._handleTap} />,
          <PanGestureRecognizer action={this._handlePan} />
        ]}>
        {children}
      </View>
    )
  }
}
