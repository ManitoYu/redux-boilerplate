import React, { PropTypes } from 'react'
import View from '../View'

export default class Window extends View {
  static propTypes = {
    rootViewController: PropTypes.element
  }

  render() {
    const { rootViewController } = this.props

    return (
      <View className="Window">
      {rootViewController}
      </View>
    )
  }
}
