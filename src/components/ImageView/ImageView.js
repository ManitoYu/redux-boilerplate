import React, { Component, PropTypes } from 'react'
import View from '../View'

export default class ImageView extends View {
  constructor(props) {
    super(props)
  }

  render() {
    const { image } = this.props

    return (
      <View className="ImageView" {...this.props}>
      {image}
      </View>
    )
  }
}

ImageView.propTypes = {
  image: PropTypes.element
}
