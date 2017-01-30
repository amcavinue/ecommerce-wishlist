const React = require('react');
const TestUtils = require('react-addons-test-utils');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const Provider = require('react-redux').Provider;

const store = require('../js/store');
const actions = require('../js/actions/index');
const ProductSearch = require('../js/components/product-search');

describe('ProductSearch Component', () => {
  it('Renders the component',  () => {
    let renderer = TestUtils.createRenderer();
    let callback = () => {
      return true;
    };
    
    renderer.render(
      <Provider store={store}>
        <ProductSearch/>
      </Provider>
    );
    let result = renderer.getRenderOutput();
    
    // Test the Provider component.
    TestUtils.isElementOfType(result, Provider);
    TestUtils.isCompositeComponent(result);
    
    // Test the nested ProductSearch component.
    TestUtils.isElementOfType(result.type.WrappedComponent[0], ProductSearch);
    TestUtils.isCompositeComponent(result.type.WrappedComponent[0]);
    
    // Test nested elements.
    /*expect(result.props.children.length).to.equal(2);
    expect(result.props.children[0].type).to.equal('h1');*/
  });
});