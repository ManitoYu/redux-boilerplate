import React, { PropTypes } from 'react'
import classnames from 'classnames'
import View from '../View'

export default class Divider extends View {
  static defaultProps = {
    style: {}
  }

  static contextTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    separatorInset: PropTypes.object
  }

  render() {
    const { className, style, separatorInset } = this.props

    if (separatorInset.top) style.paddingTop = separatorInset.top
    if (separatorInset.right) style.paddingRight = separatorInset.right
    if (separatorInset.bottom) style.paddingBottom = separatorInset.bottom
    if (separatorInset.left) style.paddingLeft = separatorInset.left

    return (
      <View className={classnames('Divider', className)} style={style} {...this.props}>
        <div></div>
        <div></div>
      </View>
    )
  }
}
