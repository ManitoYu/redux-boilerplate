import React, { Component, PropTypes } from 'react'
import { first, size, defaults } from '../Shortcuts'
import { autobind, time } from 'core-decorators'

export default class Responder extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    application: PropTypes.object
  }

  _gestureRecognizers = []
  events = {}
  isFirstResponder = false

  constructor(props) {
    super(props)

    if (props.gestureRecognizers && size(props.gestureRecognizers)) {
      this._gestureRecognizers = props.gestureRecognizers.map(g =>
        Object.assign(new g.type(), {
          action: g.props.action,
          isEnabled: g.props.isEnabled,
          view: this
        })
      )

      this.events = {
        onMouseDown: this.touchesBegan,
        onMouseMoveCapture: this.touchesMoved,
        onMouseUpCapture: this.touchesEnded,
        onTouchStart: this.touchesBegan,
        onTouchMoveCapture: this.touchesMoved,
        onTouchEndCapture: this.touchesEnded
      }
    }

    defaults(this.events, {
      onMouseDown: this.props.touchesBegan,
      onMouseMoveCapture: this.props.touchesMoved,
      onMouseUpCapture: this.props.touchesEnded,
      onTouchStart: this.props.touchesBegan,
      onTouchMoveCapture: this.props.touchesMoved,
      onTouchEndCapture: this.props.touchesEnded
    })
  }

  @autobind
  touchesBegan(e) {
    this.context.application._gestureRecognizers = this._gestureRecognizers
  }

  @autobind
  touchesMoved(e) {
  }

  @autobind
  touchesEnded(e) {
  }

  render() {
    const { children } = this.props
    const { onClick } = this.props

    return React.cloneElement(children, { ...this.events, ...children.props, onClick })
  }
}
