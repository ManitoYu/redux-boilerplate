import React, { PropTypes } from 'react'
import BarItem from '../BarItem'
import View from '../View'
import Label from '../Label'
import ImageView from '../ImageView'

export default class TabBarItem extends BarItem {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.element
  }

  render() {
    const { title, image } = this.props

    return (
      <View className="TabBarItem" {...this.props}>
        <ImageView image={image} />
        <Label>{title}</Label>
      </View>
    )
  }
}
