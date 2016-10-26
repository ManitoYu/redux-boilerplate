import React, { Component, PropTypes } from 'react'

export default class Image extends Component {
  render() {
    const { named } = this.props

    return (
      <img className="Image" src={named} />
    )
  }
}

Image.propTypes = {
  named: PropTypes.string
}
