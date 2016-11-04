import React, { PropTypes } from 'react'
import View from '../View'

export default class TabBar extends View {
  static propTypes = {
    items: PropTypes.array
  }

  items = []
  selectedItem = null

  constructor(props) {
    super(props)

    this.items = props.items
    this.selectedItem = null
  }

  setItem(tabBarItems) {
    this.items = tabBarItems
    this.forceUpdate()
  }

  render() {
    const { items } = this.props

    return (
      <View className="TabBar">
      {items}
      </View>
    )
  }
}
