import React, { Component, PropTypes } from 'react'

export default class Responder extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  _gestureRecognizers = []
  events = {}

  constructor(props) {
    super(props)

    if (props.gestureRecognizers) {
      this._gestureRecognizers = props.gestureRecognizers.map(g => {
        let gestureRecognizer = new g.type()
        gestureRecognizer.action = g.props.action
        gestureRecognizer.isEnabled = g.props.isEnabled
        gestureRecognizer.view = this
        return gestureRecognizer
      })

      this.events = {
        onMouseDown: e => this._gestureRecognizers.map(g => g.touchesBegan(e)),
        onMouseMove: e => this._gestureRecognizers.map(g => g.touchesMoved(e)),
        // onMouseOut: e => this._gestureRecognizers.map(g => g.touchesMoved(e)),
        onMouseUp: e => this._gestureRecognizers.map(g => g.touchesEnded(e)),
        onTouchStart: e => this._gestureRecognizers.map(g => g.touchesBegan(e)),
        onTouchMove: e => this._gestureRecognizers.map(g => g.touchesMoved(e)),
        onTouchEnd: e => this._gestureRecognizers.map(g => g.touchesEnded(e))
      }
    }
  }

  render() {
    const { children } = this.props
    const { onClick, onScroll } = this.props

    const events = Object.assign({}, this.events, { onClick, onScroll })

    return React.cloneElement(children, Object.assign(events, children.props))
  }
}
