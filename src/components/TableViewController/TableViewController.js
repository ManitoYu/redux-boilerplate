import React from 'react'
import TableViewCell from '../TableViewCell'
import ViewController from '../ViewController'

export default class TableViewController extends ViewController {
  numberOfSections() {
    return 1
  }

  numberOfRowsInSection( ) {
    return 1
  }

  cellForRowAtIndexPath() {
    return <TableViewCell />
  }

  didSelectRow() {
  }

  didDeselectRow() {
  }
}
