import React, { PropTypes } from 'react'
import classnames from 'classnames'

import View from '../View'
import Image from '../Image'
import {
  ImageViewContentModeFit,
  ImageViewContentModeScale,
  ImageViewContentModeCover,
  ImageViewContentModeContain
} from './constants'

export default class ImageView extends View {
  static defaultProps = {
    image: <Image />,
    contentMode: ImageViewContentModeFit,
    isUserInteractionEnabled: false
  }

  static propTypes = {
    image: PropTypes.element,
    contentMode: PropTypes.oneOf([
      ImageViewContentModeFit,
      ImageViewContentModeScale,
      ImageViewContentModeCover,
      ImageViewContentModeContain
    ])
  }

  render() {
    const { image, contentMode } = this.props

    return (
      <View className="ImageView" {...this.props}>
      {
        [ImageViewContentModeFit].includes(contentMode) &&
          image
      }
      {
        [ImageViewContentModeScale, ImageViewContentModeCover, ImageViewContentModeContain].includes(contentMode) &&
          <div
            className={
              classnames('Image', {
                'Image--scale': contentMode == ImageViewContentModeScale,
                'Image--cover': contentMode == ImageViewContentModeCover,
                'Image--contain': contentMode == ImageViewContentModeContain
              })
            }
            style={{ backgroundImage: `url(${image.props.named})` }} />
      }
      </View>
    )
  }
}
