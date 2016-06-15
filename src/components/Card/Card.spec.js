import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'
import { expect } from 'chai'
import Card from './Card'

describe('Card', () => {
  it('renders a card', () => {
    const component = renderIntoDocument(<Card></Card>)
    const card = scryRenderedDOMComponentsWithClass(component, 'Card')
    expect(card.length).to.equal(1)
  })
  it('contains a h1 tag', () => {
    const node = <h1>Onionkings</h1>
    const component = renderIntoDocument(<Card>{node}</Card>)
    const card = scryRenderedDOMComponentsWithClass(component, 'Card')
    expect(card[0].children[0].tagName).to.equal('H1')
    expect(card[0].children[0].textContent).to.equal('Onionkings');
  })
  it('has correct classes', () => {
    const component = renderIntoDocument(<Card className="test1 test2"></Card>)
    const card = scryRenderedDOMComponentsWithClass(component, 'Card')
    expect(card[0].classList.toString()).to.equal('Card test1 test2')
  })
  it('has corrent styles', () => {
    const component = renderIntoDocument(<Card style={{ width: '400px' }}></Card>)
    const card = scryRenderedDOMComponentsWithClass(component, 'Card')
    expect(card[0].style.width).to.equal('400px')
  })
})
