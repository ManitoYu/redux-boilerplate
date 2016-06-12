import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils'
import { expect } from 'chai'
import Button from './Button'

describe('Button', () => {
  it('renders a button with "button"', () => {
    const text = 'button'
    const component = renderIntoDocument(<Button>{text}</Button>)
    const button = scryRenderedDOMComponentsWithTag(component, 'button')
    expect(button[0].textContent).to.contain('button')
  })
  it('invokes callback when the button is clicked', () => {
    const text = 'button'
    let clicked = false
    const handleClick = () => clicked = true
    const component = renderIntoDocument(<Button onClick={handleClick}>{text}</Button>)
    const button = scryRenderedDOMComponentsWithTag(component, 'button')
    Simulate.click(button[0])
    expect(clicked).to.equal(true)
  })
  it('has correct styles', () => {
    const text = 'button'
    const component = renderIntoDocument(<Button style={{ margin: 'auto' }}>{text}</Button>)
    const button = scryRenderedDOMComponentsWithTag(component, 'button')
    expect(button[0].style.margin).to.equal('auto')
  })
  it('has correct classes', () => {
    const text = 'button'
    const component = renderIntoDocument(<Button className="test1 test2">{text}</Button>)
    const button = scryRenderedDOMComponentsWithTag(component, 'button')
    expect(button[0].classList.toString()).to.equal('Button test1 test2')
  })
})
