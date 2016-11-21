import React, { PropTypes } from 'react'
import View from '../View'
import classnames from 'classnames'

export default class Control extends View {

  render() {
    const { children, className } = this.props

    return (
      <View className={classnames('Control', className)}>
        {children}
      </View>
    )
  }
}
