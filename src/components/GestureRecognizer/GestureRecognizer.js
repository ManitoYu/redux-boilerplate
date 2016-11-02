import React, { Component } from 'react'
import {
  GestureRecognizerStateBegan,
  GestureRecognizerStateChanged,
  GestureRecognizerStateEnded
} from './constants'

import {
  LongPressGestureRecognizer,
  PanGestureRecognizer,
  PinchGestureRecognizer,
  RotationGestureRecognizer,
  SwipeGestureRecognizer,
  TapGestureRecognizer
} from './index'

import Touch from '../Touch'

export default class GestureRecognizer extends Component {
  constructor(props) {
    super(props)

    this.view = null
    this.numberOfTouches = []
    this.touchStates = 0

    this.gestureType = null
  }

  touchesBegan(e) {
    this.touchStates = this.touchStates & ~GestureRecognizerStateEnded
    this.touchStates = this.touchStates | GestureRecognizerStateBegan
    this.numberOfTouches.push(new Touch({ timestamp: Date.now() }))
  }

  touchesMoved(e) {
    if (! (this.touchStates & GestureRecognizerStateBegan)) return
    this.touchStates = this.touchStates | GestureRecognizerStateChanged
    this.numberOfTouches[0].update({
      timestamp: Date.now(),
      location: [e.pageX, e.pageY]
    })
    if (this.evaluate()) {
      this.gestureType = PanGestureRecognizer
    } else {
      this.gestureType = null
    }
    this.trigger(this.gestureType)
  }

  touchesEnded(e) {
    if (! (this.touchStates | GestureRecognizerStateBegan)) return
    this.touchStates = this.touchStates & ~GestureRecognizerStateBegan
    this.touchStates = this.touchStates & ~GestureRecognizerStateChanged
    this.touchStates = this.touchStates | GestureRecognizerStateEnded
    this.numberOfTouches.pop()
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
    return (b[1] - a[1]) / (b[0] - a[0])
  }

  render() {
    return (
      <div></div>
    )
  }
}
