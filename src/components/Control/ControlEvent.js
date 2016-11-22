import React, { Component, PropTypes } from 'react'
import {
  ControlEventsTouchDown,
  ControlEventsTouchUpInside,
  ControlEventsTouchUpOutside
} from './constants'

export default class ControlEvent extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      ControlEventsTouchDown,
      ControlEventsTouchUpInside,
      ControlEventsTouchUpOutside
    ]),
    action: PropTypes.func
  }

  render() {
    return <div />
  }
}
