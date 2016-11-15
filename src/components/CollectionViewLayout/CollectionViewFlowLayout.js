import { PropTypes } from 'react'
import CollectionViewLayout from './CollectionViewLayout'
import CollectionViewLayoutAttributes from './CollectionViewLayoutAttributes'
import {
  CollectionViewScrollDirectionVertical,
  CollectionViewScrollDirectionHorizontal
} from './constants'
import { sizeMake, rectMake } from '../Shortcuts'

export default class CollectionViewFlowLayout extends CollectionViewLayout {
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

  layoutAttributesForElements(rect) {
    let columns = Math.floor(rect.width / this.itemSize.width)
    let rows = Math.floor(rect.height / this.itemSize.height)

    let attrs = Array(rows).fill().map((r, m) =>
      Array(columns).fill().map((c, n) => {
        let attr = new CollectionViewLayoutAttributes()
        attr.indexPath = { section: 0, item: m * columns + n }
        attr.frame = rectMake(
          n * (this.itemSize.width + this.minimumInteritemSpacing),
          m * (this.itemSize.height + this.minimumLineSpacing),
          this.itemSize.width,
          this.itemSize.height
        )

        return attr
      })
    )
    .reduce((a, r) => a.concat(r), [])

    return attrs
  }

  layoutAttributesForItem(indexPath) {
  }

  shouldInvalidateLayout(rect) {
  }
}
