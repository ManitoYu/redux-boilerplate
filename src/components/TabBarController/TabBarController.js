import React, { PropTypes } from 'react'
import ViewController from '../ViewController'
import View from '../View'
import TabBar from '../TabBar'
import TabBarItem from '../TabBarItem'

export default class TabBarController extends ViewController {
  constructor(props) {
    super(props)

    this.viewControllers = props.viewControllers.map(
      c => React.createElement(c.type, Object.assign({}, c.props, { tabBarController: this }))
    )
    this.selectedViewController = null
    this.selectedIndex = -1
    this.tabBar = <TabBar
      items={this.viewControllers.reverse().map((c, k) =>
        <TabBarItem key={k} />
      )}
    />

    if (this.viewControllers.length > 0) {
      this.selectedViewController = this.viewControllers[0]
      this.selectedIndex = 0
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
        {React.createElement(this.selectedViewController.type, this.selectedViewController.props)}
        {this.tabBar}
      </View>
    )
  }
}

TabBarController.defaultProps = {
  viewControllers: []
}

TabBarController.propTypes = {
  viewControllers: PropTypes.array
}
