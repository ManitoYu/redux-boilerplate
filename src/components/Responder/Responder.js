import React, { Component, PropTypes } from 'react'

export default class Responder extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    touchesBegan: PropTypes.func,
    touchesMoved: PropTypes.func,
    touchesEnded: PropTypes.func
  }

  _gestureRecognizers = []
  events = {}

  constructor(props) {
    super(props)

    if (props.gestureRecognizers) {
      this._gestureRecognizers = props.gestureRecognizers.map(g => new g.type(g.props.action))

      this.events = {
        onMouseDown: e => this._gestureRecognizers.map(g => g.touchesBegan(e)),
        onMouseMove: e => this._gestureRecognizers.map(g => g.touchesMoved(e)),
        onMouseOut: e => this._gestureRecognizers.map(g => g.touchesEnded(e)),
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
