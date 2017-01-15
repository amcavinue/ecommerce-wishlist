const React = require('react');
const TestUtils = require('react-addons-test-utils');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const Provider = require('react-redux').Provider;

const store = require('../js/store');
const actions = require('../js/actions/index');
const EcommerceApp = require('../js/components/ecommerce-app');

describe('EcommerceApp Component', () => {
  it('Renders the component',  () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(
      <Provider store={store}>
        <EcommerceApp />
      </Provider>
    );
    let result = renderer.getRenderOutput();
    
    // Test the Provider component.
    TestUtils.isElementOfType(result, Provider);
    TestUtils.isCompositeComponent(result);
    
    // Test the nested EcommerceApp component.
    TestUtils.isElementOfType(result.type.WrappedComponent[0], EcommerceApp);
    TestUtils.isCompositeComponent(result.type.WrappedComponent[0]);
  });
});