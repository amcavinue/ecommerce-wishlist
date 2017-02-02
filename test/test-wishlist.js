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
      <Provider store={store}>
        <Wishlist />
      </Provider>
    );
    let result = renderer.getRenderOutput();
    
    // Test the Provider component.
    TestUtils.isElementOfType(result, Provider);
    TestUtils.isCompositeComponent(result);
    
    // Test the nested Wishlist component.
    TestUtils.isElementOfType(result.type.WrappedComponent[0], Wishlist);
    TestUtils.isCompositeComponent(result.type.WrappedComponent[0]);
  });
});