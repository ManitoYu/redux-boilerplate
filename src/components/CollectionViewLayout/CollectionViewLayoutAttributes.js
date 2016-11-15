import { rectMake, sizeMake } from '../Shortcuts'

export default class CollectionViewLayoutAttributes {
  indexPath = { section: 0, item: 0 }
  frame = rectMake(0, 0, 0, 0)
  size = sizeMake(0, 0)
  alpha = 1
  isHidden = false
}
