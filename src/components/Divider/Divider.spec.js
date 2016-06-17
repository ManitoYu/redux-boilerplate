import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'
import { expect } from 'chai'
import Divider from './Divider'

describe('Divider', () => {
  it('renders a divider', () => {
    const component = renderIntoDocument(<Divider />)
    const divider = scryRenderedDOMComponentsWithClass(component, 'Divider')
    expect(divider.length).to.equal(1)
  })
  it('has two div', () => {
    const component = renderIntoDocument(<Divider />)
    const divider = scryRenderedDOMComponentsWithClass(component, 'Divider')
    expect(divider[0].children.length).to.equal(2)
    expect(divider[0].children[0].tagName).to.equal('DIV')
    expect(divider[0].children[1].tagName).to.equal('DIV')
  })
  it('has correct classes', () => {
    const component = renderIntoDocument(<Divider className="test1 test2" />)
    const divider = scryRenderedDOMComponentsWithClass(component, 'Divider')
    expect(divider[0].classList.toString()).to.equal('Divider test1 test2')
  })
  it('has correct styles', () => {
    const component = renderIntoDocument(<Divider style={{ margin: 'auto' }} />)
    const divider = scryRenderedDOMComponentsWithClass(component, 'Divider')
    expect(divider[0].style.margin).to.equal('auto')
  })
})
