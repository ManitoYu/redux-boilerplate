import React, { PropTypes } from 'react'
import View from '../View'

export default class CollectionViewCell extends View {
  contentView = null
  backgroundView = null
  selectedBackgroundView = null
  isSelected = false
  isHighlighted = false

  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const { children, frame } = this.props

    console.log(frame)

    return (
      <View className="CollectionViewCell" {...frame}>
        {children}
      </View>
    )
  }
}
