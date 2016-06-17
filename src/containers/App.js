import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Card,
  Divider
} from '../components'

class App extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => alert()}>Click</Button>
        <Card></Card>
        <Divider />
      </div>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

export default connect(mapStateToProps)(App)
