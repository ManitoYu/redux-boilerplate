import React, { Component, PropTypes } from 'react'
import { first, size } from '../Shortcuts'
import { autobind, time } from 'core-decorators'
import Touch from '../Touch'

export default class Responder extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    application: PropTypes.object
  }

  _gestureRecognizers = []
  events = {}

  constructor(props) {
    super(props)

    if (props.gestureRecognizers && size(props.gestureRecognizers)) {
      this._gestureRecognizers = props.gestureRecognizers.map(g => {
        let gestureRecognizer = new g.type()
        gestureRecognizer.action = g.props.action
        gestureRecognizer.isEnabled = g.props.isEnabled
        gestureRecognizer.view = this
        return gestureRecognizer
      })

      this.events = {
        onMouseDownCapture: this.touchesBegan,
        onMouseMoveCapture: this.touchesMoved,
        onMouseUpCapture: this.touchesEnded,
        onMouseLeave: this.touchesMovedLeave,
        onMouseEnter: this.touchesMovedEnter,
        onTouchStartCapture: this.touchesBegan,
        onTouchMoveCapture: this.touchesMoved,
        onTouchEndCapture: this.touchesEnded
      }
    }

    if (! this.events.onMouseDownCapture) this.events.onMouseDownCapture = this.props.touchesBegan
    if (! this.events.onMouseMoveCapture) this.events.onMouseMoveCapture = this.props.touchesMoved
    if (! this.events.onMouseUpCapture) this.events.onMouseUpCapture = this.props.touchesEnded
  }

  @autobind
  touchesBegan(e) {
    this._gestureRecognizers.map(g => g.touchesBegan(this.context.application._touches, e))
  }

  @autobind
  touchesMoved(e) {
    this._gestureRecognizers.map(g => g.touchesMoved(this.context.application._touches, e))
  }

  @autobind
  touchesEnded(e) {
    this._gestureRecognizers.map(g => g.touchesEnded(this.context.application._touches, e))
    this.context.application._gestureRecognizers = []
    this.context.application._touches = []
  }

  @autobind
  touchesMovedLeave(e) {
    if (! size(this.context.application._touches)) return
    if (size(this.context.application._gestureRecognizers)) return
    this.context.application._gestureRecognizers = this._gestureRecognizers
  }

  @autobind
  touchesMovedEnter(e) {
    if (! size(this.context.application._touches)) return
    if (this.context.application._gestureRecognizers != this._gestureRecognizers) return
    this.context.application._gestureRecognizers = []
  }

  render() {
    const { children } = this.props
    const { onClick, onScroll } = this.props

    const events = Object.assign({}, this.events, { onClick, onScroll })

    return React.cloneElement(children, Object.assign(events, children.props))
  }
}
