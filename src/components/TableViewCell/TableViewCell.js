import React, { Component, PropTypes } from 'react'

import View from '../View'
import Divider from '../Divider'

export default class TableViewCell extends View {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props

    return (
      <View className="TableViewCell">
        <View className="TableViewCell-contentView">
        {children}
        </View>
        <Divider />
      </View>
    )
  }
}

TableViewCell.propTypes = {
  children:PropTypes.node
}
