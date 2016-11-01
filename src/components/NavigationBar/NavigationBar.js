import React, { PropTypes } from 'react'
import View from '../View'

export default class NavigationBar extends View {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className="NavigationBar">
      {this.props.navigationItem}
      </View>
    )
  }
}
