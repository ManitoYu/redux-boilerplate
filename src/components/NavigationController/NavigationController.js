import React, { PropTypes } from 'react'
import createHistory from 'history/createBrowserHistory'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ViewController from '../ViewController'
import View from '../View'
import NavigationBar from '../NavigationBar'

export default class NavigationController extends ViewController {
  viewControllers = []
  topViewController = null
  navigationBar = null
  _isNavigationBarHidden = false
  navigationItems = []
  history = createHistory()

  constructor(props) {
    super(props)

    this.history.listen((location, action) => {
    })

    if (props.rootViewController) {
      this.viewControllers.unshift(props.rootViewController)
      this.topViewController = props.rootViewController
    }
  }

  pushViewController(url, controller) {
    this.viewControllers.unshift(controller)
    this.topViewController = this.viewControllers[0]

    url && this.history.push(url)
    this.forceUpdate()
  }

  popViewController() {
    if (this.viewControllers.length == 1) return

    this.viewControllers.shift()
    this.topViewController = this.viewControllers[0]

    this.history.goBack()
    this.forceUpdate()
  }

  popToRootViewController() {

  }

  popToViewController() {

  }

  setNavigationBarHidden(isHidden) {
    this._isNavigationBarHidden = isHidden
    this.forceUpdate()
  }

  registerNavigationItem(index, navigationItem) {
    this.navigationItems[index] = navigationItem
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    this.viewControllers = this.viewControllers.map((c, k) =>
      React.cloneElement(c, {
        key: c.key || this.viewControllers.length - 1 - k,
        navigationController: this,
        registerNavigationItem: this.registerNavigationItem.bind(this, this.viewControllers.length - 1 - k)
      })
    )

    return (
      <View className="NavigationController">
        {! this._isNavigationBarHidden
          && <NavigationBar navigationItem={this.navigationItems[0]} />}
        <ReactCSSTransitionGroup
          component="div"
          className="NavigationController-views"
          transitionName="page"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}>
        {this.viewControllers}
        </ReactCSSTransitionGroup>
      </View>
    )
  }
}
