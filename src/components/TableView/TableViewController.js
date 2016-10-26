import React from 'react'
import TableViewCell from '../TableViewCell'

export default class TableViewController {
  numberOfSections() {
    return 1
  }

  numberOfRowsInSection() {
    return 1
  }

  cellForRowAtIndexPath() {
    return <TableViewCell />
  }
}
