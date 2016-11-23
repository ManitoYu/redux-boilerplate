import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Responder from '../Responder'

export default class Application extends Responder {
  keyWindow = null
  windows = []
  presentedViewController = null

  static childContextTypes = {
    present: PropTypes.func,
    dismiss: PropTypes.func
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

  getChildContext() {
    return {
      present: this.present.bind(this),
      dismiss: this.dismiss.bind(this)
    }
  }

  render() {
    return (
      <Responder>
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
