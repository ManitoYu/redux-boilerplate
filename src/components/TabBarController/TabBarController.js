import React, { PropTypes } from 'react'
import ViewController from '../ViewController'

export default class TabBarController extends ViewController {
  constructor(props) {
    super(props)

    this.viewControllers = props.viewControllers.map(
      c => React.createElement(c.type, Object.assign({}, c.props, { tabBarController: this }))
    )
    this.selectedViewController = null
    this.selectedIndex = -1

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
    return React.createElement(this.selectedViewController.type, this.selectedViewController.props)
  }
}

TabBarController.defaultProps = {
  viewControllers: []
}

TabBarController.propTypes = {
  viewControllers: PropTypes.array
}
