import React, { Component, PropTypes } from 'react'
import { first, size } from '../Shortcuts'
import { autobind, time } from 'core-decorators'
import Touch from '../Touch'

export default class Responder extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  _gestureRecognizers = []
  events = {}
  _touches = []

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
        onMouseDown: this.touchesBegan,
        onMouseMove: this.touchesMoved,
        onMouseUp: this.touchesEnded,
        // onMouseOut: e => this._gestureRecognizers.map(g => g.touchesMoved(e)),
        onTouchStart: this.touchesBegan,
        onTouchMove: this.touchesMoved,
        onTouchEnd: this.touchesEnded
        // onWheel: e => this._gestureRecognizers.map(g => g.numberOfTouches == 0 ? g.touchesBegan(e) : g.touchesMoved(e))
      }
    }
  }

  @autobind
  touchesBegan(e) {
    if (e.nativeEvent instanceof MouseEvent) {
      let touch = new Touch()
      touch.update(e)
      this._touches = [touch]
    }

    this._gestureRecognizers.map(g => g.touchesBegan(this._touches, e))
  }

  @autobind
  touchesMoved(e) {
    console.log(size(this._touches))
    // if (size(this._touches) > 0) {
    //   let touch = first(this._touches)
    //   touch.update(e)
    // }

    this._gestureRecognizers.map(g => g.touchesMoved(this._touches, e))
  }

  @autobind
  touchesEnded(e) {
    this._gestureRecognizers.map(g => g.touchesEnded(this._touches, e))
  }

  render() {
    const { children } = this.props
    const { onClick, onScroll } = this.props

    const events = Object.assign({}, this.events, { onClick, onScroll })

    return React.cloneElement(children, Object.assign(events, children.props))
  }
}
