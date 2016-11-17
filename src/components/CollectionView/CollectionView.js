import React, { PropTypes } from 'react'
import ScrollView from '../ScrollView'
import { sizeMake, rectMake, take } from '../Shortcuts'
import { lazyInitialize, time } from 'core-decorators'

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

  scrollViewDidScroll(scrollView) {
    this.contentOffset = scrollView.contentOffset
    this.forceUpdate()
  }

  render() {
    const { height, width, dataSource } = this.props
    const { contentOffset } = this

    this._layout._initLayout(rectMake(contentOffset.x, contentOffset.y, width, height))
    let attrs = this._layout.layoutAttributesForElements(rectMake(contentOffset.x, contentOffset.y, width, height))
    attrs = take(attrs, dataSource.numberOfItemsInSection())

    let cells = attrs.map(a => {
      let cell = dataSource.cellForItemAtIndexPath(a.indexPath)
      return React.cloneElement(cell, { ...cell.props, key: a.indexPath.item, frame: a.frame })
    })

    return (
      <ScrollView style={{ backgroundColor: '#ccc' }}
        width={width}
        height={height}
        contentSize={this._layout.collectionViewContentSize}
        delegate={this}>
        {cells}
      </ScrollView>
    )
  }
}
