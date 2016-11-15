import React, { PropTypes } from 'react'
import ScrollView from '../ScrollView'
import { sizeMake, rectMake } from '../Shortcuts'
import { lazyInitialize } from 'core-decorators'

export default class CollectionView extends ScrollView {
  @lazyInitialize _layout = this.layout()

  static propTypes = {
    delegate: PropTypes.object,
    dataSource: PropTypes.object,
    collectionViewLayout: PropTypes.object
  }

  layout() {
    const { collectionViewLayout, height, width } = this.props

    let layout = new collectionViewLayout.type()

    layout.collectionView = this
    // layout.collectionViewContentSize = sizeMake(height, width)
    layout.itemSize = collectionViewLayout.props.itemSize
    layout.scrollDirection = collectionViewLayout.props.scrollDirection
    layout.minimumLineSpacing = collectionViewLayout.props.minimumLineSpacing
    layout.minimumInteritemSpacing = collectionViewLayout.props.minimumInteritemSpacing

    return layout
  }

  render() {
    const { height, width, dataSource } = this.props

    let attrs = this._layout.layoutAttributesForElements(rectMake(0, 0, width, height))

    let cells = attrs.map((a, k) => {
      let cell = dataSource.cellForItemAtIndexPath(a.indexPath)
      return React.cloneElement(cell, { ...cell.props, key: k, frame: a.frame })
    })

    return (
      <ScrollView style={{ backgroundColor: '#4ABDAC' }} width={width} height={height} contentSize={sizeMake(width, height)}>
        {cells}
      </ScrollView>
    )
  }
}
