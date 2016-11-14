import React, { PropTypes } from 'react'
import createHistory from 'history/createBrowserHistory'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ViewController from '../ViewController'
import View from '../View'
import NavigationBar from '../NavigationBar'
import { last } from '../Shortcuts'

export default class NavigationController extends ViewController {
  static propTypes = {
    rootViewController: PropTypes.object
  }

  viewControllers = []
  topViewController = null
  navigationBar = null
  navigationItems = []
  history = createHistory()
  _isNavigationBarHidden = false

  constructor(props) {
    super(props)

    // FIXME
    // this.history.listen((location, action) => {
    // })

    if (props.rootViewController) {
      this.pushViewController('/', props.rootViewController)
    }
  }

  /**
   * @access private
   */
  _initViewControllers() {
    this.viewControllers = this.viewControllers.map((c, k) =>
      React.cloneElement(c, {
        key: c.key || k,
        navigationController: this,
        registerNavigationItem: this.registerNavigationItem.bind(this, k)
      })
    )
  }

  pushViewController(url, controller) {
    this.viewControllers.push(controller)
    this._initViewControllers()
    this.topViewController = last(this.viewControllers)

    url && this.history.push(url)

    this.viewControllers.length > 1 && this.forceUpdate()
  }

  popViewController() {
    if (this.viewControllers.length == 1) return

    this.viewControllers.pop()
    this._initViewControllers()
    this.topViewController = last(this.viewControllers)

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
    /**
     * XXX in orther to render navigation bar
     *
     * Rendering navigation bar will be later than navigation controller
     * Only when a controller is mounted the navigation bar would be registered
     * So need once force updating, the navigation can be rendered
     */
    this.forceUpdate()
  }

  render() {
    return (
      <View className="NavigationController">
        {! this._isNavigationBarHidden
          && <NavigationBar navigationItem={this.navigationItems[0]} />}
        <ReactCSSTransitionGroup
          component="div"
          className="NavigationController-views"
          transitionName="page"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}>
        {this.viewControllers}
        </ReactCSSTransitionGroup>
      </View>
    )
  }
}
