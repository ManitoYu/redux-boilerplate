import React, { PropTypes } from 'react'
import View from '../View'

export default class NavigationBar extends View {
  render() {
    return (
      <View className="NavigationBar">
      {this.props.navigationItem}
      </View>
    )
  }
}
