import React, { PropTypes } from 'react'
import View from '../View'
import Divider from '../Divider'
import { edgeInsetsMake } from '../Shortcuts'
import { TableViewCellSeparatorStyleSingleLine } from './constants'

export default class TableViewCell extends View {
  static defaultProps = {
    separatorInset: edgeInsetsMake(0, 0, 0, 0)
  }

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    separatorInset: PropTypes.object,
    separatorStyle: PropTypes.number
  }

  isSelected = false
  contentView = null
  reuseIdentifier = ''

  setSelected(isSelected) {
    this.isSelected = isSelected
    isSelected && this.props.onClick()
  }

  render() {
    const { children, y, height, separatorInset, separatorStyle } = this.props

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
        {
          separatorStyle == TableViewCellSeparatorStyleSingleLine &&
            <Divider separatorInset={separatorInset} />
        }
      </View>
    )
  }
}
