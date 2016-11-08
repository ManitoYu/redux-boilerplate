import React from 'react'
import View from '../View'

export default class ViewController extends View {
  navigationController = null
  tabBarController = null

  constructor(props) {
    super(props)

    this.navigationController = props.navigationController
    this.tabBarController = props.tabBarController
  }

  dismiss() {

  }

  present() {

  }

  render() {
    const { children } = this.props

    return (
      <View className="ViewController">
      {children}
      </View>
    )
  }
}
