const React = require('react');
const TestUtils = require('react-addons-test-utils');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const Provider = require('react-redux').Provider;

const store = require('../js/store');
const actions = require('../js/actions/index');
const Wishlist = require('../js/components/wishlist');

describe('Wishlist Component', () => {
  it('Renders the component',  () => {
    let renderer = TestUtils.createRenderer();
    
    renderer.render(
      <Wishlist />
    );
    let result = renderer.getRenderOutput();
    
    // Test the component.
    TestUtils.isElementOfType(result, Wishlist);
    TestUtils.isCompositeComponent(result);
  });
});