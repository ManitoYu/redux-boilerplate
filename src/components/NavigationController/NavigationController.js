import React from 'react'
import createHistory from 'history/createBrowserHistory'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ViewController from '../ViewController'
import View from '../View'

export default class NavigationController extends ViewController {
  constructor(props) {
    super(props)

    this.viewControllers = []
    this.topViewController = null

    this.history = createHistory()
    this.history.listen((location, action) => {
    })

    if (props.rootViewController) {
      this.viewControllers.push(props.rootViewController)
    }
  }

  pushViewController(url, controller) {
    this.viewControllers.push(controller)
    this.topViewController = this.viewControllers[this.viewControllers.length - 1]

    this.history.push(url)
    this.forceUpdate()
  }

  popViewController() {
    if (this.viewControllers.length == 1) return

    this.viewControllers.pop()
    this.topViewController = this.viewControllers[this.viewControllers.length - 1]

    this.history.goBack()
    this.forceUpdate()
  }

  popToRootViewController() {

  }

  popToViewController() {

  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="page"
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}>
      {
        this.viewControllers.map((c, k) =>
          React.createElement(c.type, Object.assign({}, c.props, {
            key: k,
            navigationController: this
          }))
        )
      }
      </ReactCSSTransitionGroup>
    )
  }
}
