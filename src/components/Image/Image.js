import React, { Component, PropTypes } from 'react'

export default class Image extends Component {
  static defaultProps = {
    named: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
  }

  static propTypes = {
    named: PropTypes.string
  }

  render() {
    const { named } = this.props

    return (
      <img className="Image" src={named} />
    )
  }
}
