import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Responder from '../Responder'
import { autobind } from 'core-decorators'
import { size, first } from '../Shortcuts'
import Touch from '../Touch'

export default class Application extends Responder {
  keyWindow = null
  windows = []
  presentedViewController = null
  _touches = []

  static childContextTypes = {
    present: PropTypes.func,
    dismiss: PropTypes.func,
    touches: PropTypes.array,
    application: PropTypes.object
  }

  getChildContext() {
    return {
      present: this.present.bind(this),
      dismiss: this.dismiss.bind(this),
      application: this
    }
  }

  constructor(props) {
    super(props)

    this.keyWindow = this.props.keyWindow
  }

  present(controller) {
    this.presentedViewController = controller
    this.forceUpdate()
  }

  dismiss() {
    this.presentedViewController = null
    this.forceUpdate()
  }

  @autobind
  touchesBegan(e) {
    // if (e.nativeEvent instanceof MouseEvent) {

    // }
    let touch = new Touch()
    touch.update(e)
    this._touches = [touch]
  }

  @autobind
  touchesMoved(e) {
    if (size(this._touches) > 0) {
      let touch = first(this._touches)
      touch.update(e)
    }
    this._gestureRecognizers.map(g => g.touchesMoved(this._touches, e))
  }

  @autobind
  touchesEnded(e) {
    this._gestureRecognizers.map(g => g.touchesEnded(this._touches, e))
    this._gestureRecognizers = []
    this._touches = []
  }

  render() {
    return (
      <Responder
        touchesBegan={this.touchesBegan}
        touchesMoved={this.touchesMoved}
        touchesEnded={this.touchesEnded}>
        <div className="Application">
          {this.keyWindow}
          <ReactCSSTransitionGroup
            transitionName="modal"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={800}>
            {this.presentedViewController}
          </ReactCSSTransitionGroup>
        </div>
      </Responder>
    )
  }
}
