import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Responder from '../Responder'
import { autobind, time } from 'core-decorators'
import { size, first } from '../Shortcuts'
import Touch from '../Touch'
import classnames from 'classnames'
import {
  ApplicationStateActive,
  ApplicationStateInactive,
  ApplicationStateBackground,
  ApplicationRunModeDefault,
  ApplicationRunModeTracking
} from './constants'

export default class Application extends Responder {
  keyWindow = null
  windows = []
  presentedViewController = null
  applicationState = ApplicationStateInactive
  currentRunMode = ApplicationRunModeDefault
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
    this.isFirstResponder = true
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
    this.applicationState = ApplicationStateActive

    let touch = new Touch()
    touch.update(e)
    this._touches = [touch]

    this._gestureRecognizers.map(g => g.touchesBegan(this._touches, e))
  }

  /**
   * there is a strange bug
   *
   * When you scroll the scrollview, it will be jammed on next scrolling once you
   * moved mouse into another element.
   * The bug disappears in Firefox, but appears in Chrome.
   */
  @autobind
  touchesMoved(e) {
    e.stopPropagation()
    if (! size(this._touches)) return

    first(this._touches).update(e)
    this._gestureRecognizers.map(g => g.touchesMoved(this._touches, e))
  }

  @autobind
  touchesEnded(e) {
    e.stopPropagation()
    if (! size(this._touches)) return

    this._gestureRecognizers.map(g => g.touchesEnded(this._touches, e))
    this._gestureRecognizers = []
    this._touches = []

    this.applicationState = ApplicationStateInactive
  }

  _runMode(mode) {
    this.currentRunMode = mode
    this.forceUpdate()
  }

  render() {
    return (
      <Responder
        touchesBegan={this.touchesBegan}
        touchesMoved={this.touchesMoved}
        touchesEnded={this.touchesEnded}>
        <div className={classnames('Application', { 'is-tracking': this.currentRunMode == ApplicationRunModeTracking })}>
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
