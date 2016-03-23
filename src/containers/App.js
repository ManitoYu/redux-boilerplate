import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <h1 onClick={() => this.props.dispatch({ type: 'ADD_POST', post: { id: Math.random() } })}>App</h1>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

export default connect(mapStateToProps)(App)
