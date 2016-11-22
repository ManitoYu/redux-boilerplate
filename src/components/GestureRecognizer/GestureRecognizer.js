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
  touches = []
  numberOfTouches = 0
  gestureState = GestureRecognizerStatePossible
  rads = []
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

  touchesBegan(e) {
    if (! this.isEnabled) return
    e.stopPropagation()
    this.gestureState = GestureRecognizerStateBegan
    this.began(e)
    this.evaluate() && this.action(this)
  }

  touchesMoved(e) {
    e.stopPropagation()
    if (! this.shouldSample()) return
    if (this.gestureState == GestureRecognizerStatePossible) return
    if (this.gestureState == GestureRecognizerStateEnded) return
    this.moved(e)
    this.evaluate() && this.action(this)
    if (e.buttons == 0) this.touchesEnded(e)
  }

  touchesEnded(e) {
    e.stopPropagation()
    this.gestureState = GestureRecognizerStateEnded
    this.ended(e)
    this.action(this)
    this.reset()
  }

  computeRads() {
    let ratio = this.computeRatio(
      first(this.touches).previousLocation(),
      first(this.touches).location()
    )

    if (isNaN(ratio)) return 0

    if (ratio == Infinity) this.rads.push(0.5) // 向下90度
    if (ratio == -Infinity) this.rads.push(-0.5) // 向上90度
    this.rads.push(Math.tanh(ratio) / Math.PI)
  }

  computeRatio(a, b) {
    if (! a || ! b) return NaN
    return (b.y - a.y) / (b.x - a.x)
  }

  evaluate() {
    this.gestureState = GestureRecognizerStatePossible
    this.computeRads()
    let isChanged = this.estimate()
    this.gestureState = GestureRecognizerStateChanged
    return isChanged
  }

  began() {
  }

  moved() {
  }

  ended() {
  }

  reset() {
    this.rads = []
    this.gestureState = GestureRecognizerStatePossible
  }

  estimate() {
  }

  render() {
    return (
      <div />
    )
  }
}
