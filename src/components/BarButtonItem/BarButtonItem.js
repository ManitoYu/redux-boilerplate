import React, { PropTypes } from 'react'
import BarItem from '../BarItem'
import View from '../View'
import ImageView from '../ImageView'
import Label from '../Label'

export default class BarButtonItem extends BarItem {
  constructor(props) {
    super(props)
  }

  render() {
    const { customView, image, title, action } = this.props

    let realView = null

    if (customView) {
      realView = customView
    } else {
      if (image) {
        realView = <ImageView image={image} />
      } else {
        realView = <Label>{title}</Label>
      }
    }

    return (
      <View className="BarButtonItem" onClick={action}>
      {realView}
      </View>
    )
  }
}

BarButtonItem.propTypes = {
  image: PropTypes.element,
  title: PropTypes.string,
  action: PropTypes.func,
  customView: PropTypes.element
}
