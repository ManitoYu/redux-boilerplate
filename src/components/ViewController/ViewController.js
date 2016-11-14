import { PropTypes } from 'react'
import View from '../View'

export default class ViewController extends View {
  navigationController = null
  tabBarController = null
  presentingViewController = null
  presentedViewController = null

  static contextTypes = {
    present: PropTypes.func,
    dismiss: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.navigationController = props.navigationController
    this.tabBarController = props.tabBarController
  }

  dismiss() {
    this.presentingViewController = null
    this.presentedViewController = null
    this.context.dismiss()
  }

  present(controller) {
    this.presentingViewController = this
    this.presentedViewController = controller
    this.context.present(this.presentedViewController)
  }
}
