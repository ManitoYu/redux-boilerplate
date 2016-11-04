import React, { PropTypes } from 'react'
import classnames from 'classnames'
import View from '../View'

export default class ScrollView extends View {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isScrollEnabled: PropTypes.bool,
    isPagingEnabled: PropTypes.bool,
    delegate: PropTypes.object
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
