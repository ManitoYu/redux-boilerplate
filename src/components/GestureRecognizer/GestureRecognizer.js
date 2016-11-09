import React, { Component } from 'react'
import {
  GestureRecognizerStateBegan,
  GestureRecognizerStateChanged,
  GestureRecognizerStateEnded
} from './constants'

import { time } from 'core-decorators'

export default class GestureRecognizer extends Component {
  view = null
  numberOfTouches = []
  gestureState = 0
  gestureType = null
  rads = []

  // frequency control
  interval = 1
  intervalSteps = this.interval

  touchesBegan(e) {
    this.gestureState &= ~GestureRecognizerStateEnded
    this.gestureState |= GestureRecognizerStateBegan
    this.began(e)
  }

  shouldSample() {
    if (this.intervalSteps > 0) {
      this.intervalSteps --
      return false
    }
    this.intervalSteps = this.interval
    return true
  }

  touchesMoved(e) {
    if (! this.shouldSample()) return
    if (! (this.gestureState & GestureRecognizerStateBegan)) return
    this.gestureState |= GestureRecognizerStateChanged
    this.moved(e)
    this.evaluate() && this.action(this)
    if (e.buttons == 0) this.touchesEnded(e)
  }

  touchesEnded(e) {
    if (! (this.gestureState & GestureRecognizerStateBegan)) return
    if (this.gestureState & GestureRecognizerStateEnded) return
    this.gestureState &= ~GestureRecognizerStateBegan
    this.gestureState &= ~GestureRecognizerStateChanged
    this.gestureState |= GestureRecognizerStateEnded
    this.ended(e)
    this.action(this)
    this.rads = []
  }

  computeRads() {
    let ratio = this.computeRatio(
      this.numberOfTouches[0].previousLocation(),
      this.numberOfTouches[0].location()
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
    this.computeRads()
    return this.estimate()
  }

  began() {
  }

  moved() {
  }

  ended() {
  }

  estimate() {
  }

  render() {
    return (
      <div></div>
    )
  }
}
