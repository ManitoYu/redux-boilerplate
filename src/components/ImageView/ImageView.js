import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import View from '../View'
import Image from '../Image'
import {
  ImageViewContentModeFit,
  ImageViewContentModeScale,
  ImageViewContentModeCover,
  ImageViewContentModeContain
} from './enums'

export default class ImageView extends View {
  constructor(props) {
    super(props)
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

ImageView.defaultProps = {
  image: <Image />,
  contentMode: ImageViewContentModeFit
}

ImageView.propTypes = {
  image: PropTypes.element,
  contentMode: PropTypes.oneOf([
    ImageViewContentModeFit,
    ImageViewContentModeScale,
    ImageViewContentModeCover,
    ImageViewContentModeContain
  ])
}
