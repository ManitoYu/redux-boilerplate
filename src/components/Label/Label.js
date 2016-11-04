import React, { PropTypes } from 'react'
import View from '../View'

export default class Label extends View {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const { children } = this.props

    return (
      <View className="Label">
      {children}
      </View>
    )
  }
}
