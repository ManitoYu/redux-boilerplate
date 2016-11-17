import { PropTypes } from 'react'
import CollectionViewLayout from './CollectionViewLayout'
import CollectionViewLayoutAttributes from './CollectionViewLayoutAttributes'
import {
  CollectionViewScrollDirectionVertical,
  CollectionViewScrollDirectionHorizontal
} from './constants'
import { sizeMake, rectMake } from '../Shortcuts'

export default class CollectionViewFlowLayout extends CollectionViewLayout {
  _totalItems = 0
  _columns = 0
  _rows = 0
  _interItemSpacing = 0
  _lineSpacing = 0
  _elementsLayoutAttributes = {}
  _totalRows = 0
  _totalColumns = 0

  static propTypes = {
    scrollDirection: PropTypes.oneOf([
      CollectionViewScrollDirectionVertical,
      CollectionViewScrollDirectionHorizontal
    ]),
    minimumLineSpacing: PropTypes.number,
    minimumInteritemSpacing: PropTypes.number,
    itemSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    sectionInset: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    })
  }

  prepare() {

  }

  targetContentOffset(offset, velocity) {
  }

  _initLayout(rect) {
    let totalItems = this.collectionView.props.dataSource.numberOfItemsInSection()

    let columns = Math.floor(
      (rect.width + this.minimumInteritemSpacing) / (this.itemSize.width + this.minimumInteritemSpacing)
    )
    let interItemSpacing = (rect.width - columns * this.itemSize.width) / (columns - 1)

    let rows = Math.floor(
      (rect.height + this.minimumLineSpacing) / (this.itemSize.height + this.minimumLineSpacing)
    )
    let lineSpacing = (rect.height - rows * this.itemSize.height) / (rows - 1)

    this.collectionViewContentSize = sizeMake(
      columns * (this.itemSize.width + interItemSpacing) - interItemSpacing,
      Math.ceil(totalItems / columns) * (this.itemSize.height + lineSpacing) - lineSpacing
    )

    this._totalItems = totalItems
    this._columns = columns
    this._rows = rows
    this._lineSpacing = lineSpacing
    this._interItemSpacing = interItemSpacing
    this._totalRows = Math.ceil(totalItems / columns)
  }

  layoutAttributesForElements(rect) {
    this._initLayout(rect)

    let attrs = Array(this._totalRows).fill().map((r, m) =>
      Array(this._columns).fill().map((c, n) => {
        if (! this._isInRect(m, n, rect)) return []
        return this.layoutAttributesForItem({ section: 0, item: m * this._columns + n, m, n })
      })
      .reduce((a, c) => a.concat(c), [])
    )
    .reduce((a, r) => a.concat(r), [])

    return attrs
  }

  _isInRect(m, n, rect) {
    if ((m + 1) * (this.itemSize.height + this._lineSpacing) <= rect.y) return false
    if (m * (this.itemSize.height + this._lineSpacing) >= rect.height + rect.y) return false
    return true
  }

  layoutAttributesForItem(indexPath) {
    let attr = this._elementsLayoutAttributes[indexPath.item]
    if (! attr) {
      attr = new CollectionViewLayoutAttributes()
      attr.indexPath = indexPath
      attr.frame = rectMake(
        indexPath.n * (this.itemSize.width + this._interItemSpacing),
        indexPath.m * (this.itemSize.height + this._lineSpacing),
        this.itemSize.width,
        this.itemSize.height
      )
      this._elementsLayoutAttributes[indexPath.item] = attr
    }
    return attr
  }

  invalidateLayout() {
    this._elementsLayoutAttributes = []
  }

  shouldInvalidateLayout(rect) {

  }
}
