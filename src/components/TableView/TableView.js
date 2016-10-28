import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ScrollView from '../ScrollView'
import TableViewController from '../TableViewController'

export default class TableView extends ScrollView {
  constructor(props) {
    super(props)
  }

  render() {
    const { dataSource, className } = this.props

    return (
      <ScrollView className={classnames('TableView', className)} {...this.props}>
      {
        Array(dataSource.numberOfSections()).fill().map((k, s) =>
          Array(dataSource.numberOfRowsInSection(s)).fill().map((j, r) =>
            dataSource.cellForRowAtIndexPath(s, r)
          )
        )
      }
      </ScrollView>
    )
  }
}

TableView.defaultProps = {
  dataSource: new TableViewController
}

TableView.PropTypes = {
  dataSource: PropTypes.object,
  className: PropTypes.string
}
