import React, { Component, PropTypes } from 'react'

export default class Image extends Component {
  render() {
    const { named } = this.props

    return (
      <img className="Image" src={named} />
    )
  }
}

Image.defaultProps = {
  named: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
}

Image.propTypes = {
  named: PropTypes.string
}
