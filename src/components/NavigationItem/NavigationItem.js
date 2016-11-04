import React, { PropTypes } from 'react'
import View from '../View'
import BarButtonItem from '../BarButtonItem'

export default class NavigationItem extends View {
  static defaultProps = {
    title: '',
    leftBarButtonItem: <BarButtonItem />,
    rightBarButtonItem: <BarButtonItem />,
    leftBarButtonItems: [],
    rightBarButtonItems: []
  }

  static propTypes = {
    title: PropTypes.string
  }

  title = ''
  backBarButtonItem = null
  leftBarButtonItem = null
  rightBarButtonItem = null
  leftBarButtonItems = null
  rightBarButtonItems = null

  constructor(props) {
    super(props)

    this.backBarButtonItem = <BarButtonItem />
    this.leftBarButtonItem = props.leftBarButtonItem
    this.rightBarButtonItem = props.rightBarButtonItem
    this.leftBarButtonItems = props.leftBarButtonItems
    this.rightBarButtonItems = props.rightBarButtonItems
  }

  setLeftBarButtonItems(barbuttonItems) {
    this.leftBarButtonItems = barbuttonItems
  }

  setLeftBarButton(barbuttonItem) {
    this.leftBarButtonItem = barbuttonItem
  }

  setRightBarButtonItems(barbuttonItems) {
    this.rightBarButtonItems = barbuttonItems
  }

  setRightBarButton(barbuttonItem) {
    this.rightBarButtonItem = barbuttonItem
  }

  render() {
    return (
      <View className="NavigationItem">
        <View className="NavigationItem-left">
        {
          this.leftBarButtonItems.length
            ? this.leftBarButtonItems.map((i, k) => React.createElement(i.type, Object.assign({ key: k }, i.props)))
            : this.leftBarButtonItem
        }
        </View>
        <View className="NavigationItem-right">
        {
          this.rightBarButtonItems.length
            ? this.rightBarButtonItems.map((i, k) => React.createElement(i.type, Object.assign({ key: k }, i.props)))
            : this.rightBarButtonItem
        }
        </View>
      </View>
    )
  }
}
