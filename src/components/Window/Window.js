import React, { PropTypes } from 'react'
import View from '../View'
import ViewController from '../ViewController'

export default class Window extends View {
  render() {
    const { rootViewController } = this.props

    return (
      <View className="Window">
      {rootViewController}
      </View>
    )
  }
}

Window.propTypes = {
  rootViewController: PropTypes.element
}
