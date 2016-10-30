import React, { Component } from 'react'
import BarItem from '../BarItem'
import View from '../View'
import Label from '../Label'
import ImageView from '../ImageView'

export default class TabBarItem extends BarItem {
  render() {
    const { title, image } = this.props

    return (
      <View className="TabBarItem">
        <ImageView image={image} />
        <Label>{title}</Label>
      </View>
    )
  }
}
