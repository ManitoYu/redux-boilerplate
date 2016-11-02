import React from 'react'
import GestureRecognizer from './GestureRecognizer'

export default class PanGestureRecognizer extends GestureRecognizer {
  constructor(action) {
    super()

    this.action = action
    this.view = null
  }

  trigger(type) {
    if (this.constructor == type) {
      this.action()
    }
  }

  computeRatio(a, b) {
    if (! a || ! b) return []
    return (a.y - b.y) / (a.x - b.x)
  }
}
