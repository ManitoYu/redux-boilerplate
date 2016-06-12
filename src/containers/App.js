import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  Button
} from '../components'

class App extends Component {
  render() {
    return (
      <Button onClick={() => alert()}>Click</Button>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

export default connect(mapStateToProps)(App)
