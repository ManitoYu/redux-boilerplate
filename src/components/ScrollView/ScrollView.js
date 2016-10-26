import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import View from '../View'

export default class ScrollView extends View {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, className } = this.props

    return (
      <View className={classnames('ScrollView', className)} {...this.props}>
      {children}
      </View>
    )
  }
}

ScrollView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
