import React, { Component, PropTypes } from 'react'
import {
  LongPressGestureRecognizer,
  PanGestureRecognizer,
  PinchGestureRecognizer,
  RotationGestureRecognizer,
  SwipeGestureRecognizer,
  TapGestureRecognizer
} from '../GestureRecognizer'

export default class Responder extends Component {
  constructor(props) {
    super(props)

    this._gestureRecognizers = []

    if (props.gestureRecognizers) {
      this._gestureRecognizers = props.gestureRecognizers.map(g => new g.type(g.props.action))

      this.events = {
        onMouseDown: e => this._gestureRecognizers.map(g => g.touchesBegan(e)),
        onMouseMove: e => this._gestureRecognizers.map(g => g.touchesMoved(e)),
        onMouseUp: e => this._gestureRecognizers.map(g => g.touchesEnded(e))
      }
    }
  }

  render() {
    const { children } = this.props
    const { touchesBegan, touchesEnded, touchesMoved, onClick } = this.props

    const events = Object.assign({}, this.events, { onClick })

    return React.cloneElement(children, Object.assign(events, children.props))
  }
}

Responder.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  touchesBegan: PropTypes.func,
  touchesMoved: PropTypes.func,
  touchesEnded: PropTypes.func
}
