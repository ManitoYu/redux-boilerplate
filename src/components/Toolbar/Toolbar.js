import React, { PropTypes } from 'react'
import View from '../View'

export default class Toolbar extends View {
  constructor(props) {
    super(props)

    this.items = props.items
  }

  setItems(items) {
    this.items = items
  }

  render() {
    return (
      <View className="Toolbar">
      </View>
    )
  }
}

Toolbar.defaultProps = {
  items: []
}

Toolbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element)
}
