import React from 'react'
import View from '../View'

export default class ViewController extends View {
  render() {
    const { children } = this.props

    return (
      <View className="ViewController">
      {children}
      </View>
    )
  }
}
