import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ScrollView from '../ScrollView'
import { sizeMake } from '../Shortcuts'

export default class TableView extends ScrollView {
  static propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.object,
    delegate: PropTypes.object,
    rowHeight: PropTypes.number
  }

  // current index path of row which is selected
  indexPathForSelectedRow = {}

  // An array of index paths for visible cells
  indexPathsForVisibleRows = []

  // visible cells
  visibleCells = []

  // number of visible cells
  visibleCellsNumber = 0

  // height of each row
  rowHeight = 44

  // total sections
  numberOfSections = 1

  // content height of tableview
  contentHeight = 0

  // start index of next list
  startOfRows = 0

  // end index of next list
  endOfRows = 0

  // TODO inset of cell separator
  separatorInset = null

  constructor(props) {
    super(props)

    if (props.rowHeight) this.rowHeight = props.rowHeight
    this.visibleCellsNumber = Math.ceil(this.props.height / this.rowHeight) + 1

    // estimate whether value is greater than number of rows
    if (this.visibleCellsNumber > this.numberOfRowsInSection(0)) {
      this.visibleCellsNumber = this.numberOfRowsInSection(0)
    }

    this.endOfRows = this.startOfRows + this.visibleCellsNumber
  }

  numberOfRowsInSection(section) {
    return this.props.dataSource.numberOfRowsInSection(section)
  }

  scrollViewDidScroll(scrollView) {
    // calculates number of cells out of tableview
    let outOfRows = Math.floor(scrollView.contentOffset.y / this.rowHeight)

    // has no changes
    if (outOfRows == this.startOfRows) return

    // scroll to bottom
    if (outOfRows + this.visibleCellsNumber > this.numberOfRowsInSection(0)) return

    this.startOfRows = outOfRows

    this.endOfRows = this.startOfRows + this.visibleCellsNumber

    this.forceUpdate()
  }

  render() {
    const { className, dataSource, delegate } = this.props

    this.contentHeight = this.numberOfRowsInSection(0) * this.rowHeight
    this.indexPathsForVisibleRows = []

    let cells = Array(this.visibleCellsNumber)
      .fill()
      .map((c, k) => ({ section: 0, row: this.startOfRows + k }))
      .map(indexPath => {
        let cell = dataSource.cellForRowAtIndexPath(indexPath)
        this.indexPathsForVisibleRows.push(indexPath)
        return React.cloneElement(
          cell,
          {
            ...cell.props,
            key: indexPath.row,
            y: this.rowHeight * indexPath.row,
            height: this.rowHeight,
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

    return (
      <ScrollView {...this.props}
        delegate={this}
        className={classnames('TableView', className)}
        contentSize={sizeMake(0, this.contentHeight)}>
      {cells}
      </ScrollView>
    )
  }
}
