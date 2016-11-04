import React, { PropTypes } from 'react'
import ViewController from '../ViewController'
import View from '../View'
import TabBar from '../TabBar'

export default class TabBarController extends ViewController {
  static defaultProps = {
    viewControllers: []
  }

  static propTypes = {
    viewControllers: PropTypes.array
  }

  selectedViewController = null
  selectedIndex = -1
  viewControllers = []
  tabBar = null

  constructor(props) {
    super(props)

    this.viewControllers = props.viewControllers.map(
      (c, k) => React.cloneElement(c, Object.assign({ key: k, tabBarController: this }, c.props))
    )

    // tabBar
    let items = this.viewControllers.map((c, k) =>
      React.cloneElement(c.props.tabBarItem, Object.assign({}, c.props.tabBarItem.props, {
        key: k,
        onClick: () => this.setSelectedIndex(k)
      }))
    )
    this.tabBar = <TabBar items={items} />

    if (props.viewControllers.length > 0) {
      this.selectedIndex = 0
      this.selectedViewController = this.viewControllers[this.selectedIndex]
    }
  }

  setViewControllers(controllers) {
    this.viewControllers = controllers
  }

  setSelectedIndex(index) {
    this.selectedViewController = this.viewControllers[index]
    this.selectedIndex = index
    this.forceUpdate()
  }

  render() {
    return (
      <View className="TabBarController">
        <View className="TabBarController-views">
        {
          this.viewControllers.map((e, k) =>
            <View key={k} isHidden={k != this.selectedIndex}>{e}</View>
          )
        }
        </View>
        {this.tabBar}
      </View>
    )
  }
}
