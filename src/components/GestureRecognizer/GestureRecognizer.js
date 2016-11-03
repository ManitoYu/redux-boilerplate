import React, { Component } from 'react'
import {
  GestureRecognizerStateBegan,
  GestureRecognizerStateChanged,
  GestureRecognizerStateEnded
} from './constants'

export default class GestureRecognizer extends Component {
  constructor(props) {
    super(props)

    this.view = null
    this.numberOfTouches = []
    this.gestureState = 0
    this.gestureType = null
    this.rads = []
  }

  touchesBegan(e) {
    this.gestureState &= ~GestureRecognizerStateEnded
    this.gestureState |= GestureRecognizerStateBegan
    this.began(e)
  }

  touchesMoved(e) {
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

  render() {
    return (
      <div></div>
    )
  }
}
