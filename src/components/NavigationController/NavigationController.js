import React from 'react'
import createHistory from 'history/createBrowserHistory'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ViewController from '../ViewController'
import View from '../View'
import NavigationBar from '../NavigationBar'

export default class NavigationController extends ViewController {
  constructor(props) {
    super(props)

    this.viewControllers = []
    this.topViewController = null
    this.navigationBar = <NavigationBar />
    this._isNavigationBarHidden = false

    this.history = createHistory()
    this.history.listen((location, action) => {
    })

    if (props.rootViewController) {
      this.viewControllers.unshift(props.rootViewController)
    }
  }

  pushViewController(url, controller) {
    this.viewControllers.unshift(controller)
    this.topViewController = this.viewControllers[0]

    this.history.push(url)
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

  render() {
    this.viewControllers = this.viewControllers.map((c, k) =>
      React.createElement(c.type, Object.assign({}, c.props, {
        key: c.key || Math.random().toString(36).slice(2),
        navigationController: this
      }))
    )

    return (
      <View className="NavigationController" {...this.props}>
        {! this._isNavigationBarHidden && this.navigationBar}
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
