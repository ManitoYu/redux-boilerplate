import React, { Component } from 'react'
import {
  GestureRecognizerStatePossible,
  GestureRecognizerStateBegan,
  GestureRecognizerStateChanged,
  GestureRecognizerStateEnded
} from './constants'

import { first } from '../Shortcuts'

import { time } from 'core-decorators'

export default class GestureRecognizer extends Component {
  static defaultProps = {
    isEnabled: true
  }

  action = null
  view = null
  numberOfTouches = 0
  gestureState = GestureRecognizerStatePossible
  isEnabled = true

  // frequency control
  interval = 1
  intervalSteps = this.interval

  shouldSample() {
    if (this.intervalSteps > 0) {
      this.intervalSteps --
      return false
    }
    this.intervalSteps = this.interval
    return true
  }

  touchesBegan(touches, e) {
    if (! this.isEnabled) return
    e.stopPropagation()
    this.gestureState = GestureRecognizerStateBegan
    this.began(touches, e)
    this.evaluate(touches) && this.action(this)
  }

  touchesMoved(touches, e) {
    e.stopPropagation()
    if (! this.shouldSample()) return
    if (this.gestureState == GestureRecognizerStatePossible) return
    if (this.gestureState == GestureRecognizerStateEnded) return

    this.moved(touches, e)

    this.gestureState = GestureRecognizerStatePossible
    let isChanged = this.evaluate(touches)
    this.gestureState = GestureRecognizerStateChanged
    isChanged && this.action(this)

    if (e.buttons == 0) this.touchesEnded(touches, e)
  }

  touchesEnded(touches, e) {
    e.stopPropagation()
    this.gestureState = GestureRecognizerStateEnded
    this.ended(touches, e)
    this.action(this)
    this.reset()
  }

  began(touches, e) {
  }

  moved(touches, e) {
  }

  ended(touches, e) {
  }

  reset() {
    this.gestureState = GestureRecognizerStatePossible
  }

  render() {
    return <div />
  }
}
