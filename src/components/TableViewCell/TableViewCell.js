import React, { PropTypes } from 'react'
import View from '../View'
import Divider from '../Divider'

export default class TableViewCell extends View {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  isSelected = false
  contentView = null
  reuseIdentifier = ''

  setSelected(isSelected) {
    this.isSelected = isSelected
    isSelected && this.props.onClick()
  }

  render() {
    const { children, y, height } = this.props

    return (
      <View
        className="TableViewCell"
        onClick={this.setSelected.bind(this, true)}
        y={y}>
        <View
          className="TableViewCell-contentView"
          height={height}
          clipsToBounds={true}>
        {children}
        </View>
        <Divider />
      </View>
    )
  }
}
