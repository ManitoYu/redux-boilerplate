import React, { PropTypes } from 'react'
import View from '../View'

export default class Label extends View {
  render() {
    const { children } = this.props

    return (
      <View className="Label">
      {children}
      </View>
    )
  }
}

Label.propTypes = {
  children: PropTypes.node
}
