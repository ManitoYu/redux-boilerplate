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
}
