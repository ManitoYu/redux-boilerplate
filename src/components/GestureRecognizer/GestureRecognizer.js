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
  }

  touchesEnded(e) {
    if (! (this.gestureState & GestureRecognizerStateBegan)) return
    if (this.gestureState & GestureRecognizerStateEnded) return
    this.gestureState &= ~GestureRecognizerStateBegan
    this.gestureState &= ~GestureRecognizerStateChanged
    this.gestureState |= GestureRecognizerStateEnded
    this.ended(e)
  }

  evaluate() {
    let locations = this.numberOfTouches[0].locations

    let ratios = locations.reduce((s, v, k, a) => s.concat(this.computeRatio(a[k], a[k + 1])), [])

    let rads = ratios
      .filter(r => ! isNaN(r))
      .map(r => {
        if (r == Infinity) return 0.5 // 向下90度
        if (r == -Infinity) return -0.5 // 向上90度
        return Math.tanh(r) / Math.PI
      })

    if (rads.length <= 1) return false

    return Math.max.apply(null, rads) - Math.min.apply(null, rads) < .5
  }

  computeRatio(a, b) {
    if (! a || ! b) return []
    return (b.y - a.y) / (b.x - a.x)
  }

  render() {
    return (
      <div></div>
    )
  }
}
