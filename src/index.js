import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import configureStore from './store/configureStore'
import Root from './containers/Root'

const store = configureStore()

render(
  <Root store={store} history={hashHistory} />,
  document.querySelector('#root')
)
