import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ScrollView from '../ScrollView'

export default class TableView extends ScrollView {
  static propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.object,
    delegate: PropTypes.object
  }

  indexPathForSelectedRow = {}

  render() {
    const { className, dataSource, delegate } = this.props
    this.visibleCells = []

    return (
      <ScrollView {...this.props} className={classnames('TableView', className)}>
      {
        Array(dataSource.numberOfSections()).fill().map((k, s) =>
          Array(dataSource.numberOfRowsInSection(s)).fill().map((j, r) => {
            let indexPath = { section: s, row: r }
            let cell = dataSource.cellForRowAtIndexPath(indexPath)
            return React.cloneElement(
              cell,
              {
                ...cell.props,
                key: `${s}-${r}`,
                onClick: () => {
                  if (this.indexPathForSelectedRow.section != indexPath.section
                    || this.indexPathForSelectedRow.row != indexPath.row) {
                    delegate.didDeselectRow({ ...this.indexPathForSelectedRow })
                  }
                  this.indexPathForSelectedRow = indexPath
                  delegate.didSelectRow(indexPath)
                }
              }
            )
          })
        )
      }
      </ScrollView>
    )
  }
}
