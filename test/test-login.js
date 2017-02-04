const React = require('react');
const TestUtils = require('react-addons-test-utils');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const Provider = require('react-redux').Provider;

const store = require('../js/store');
const actions = require('../js/actions/index');
const Login = require('../js/components/login');

describe('Login Component', () => {
  it('Renders the component',  () => {
    let renderer = TestUtils.createRenderer();
    let callback = () => {
      return true;
    };
    
    renderer.render(
      <Login showNewUser={callback} />
    );
    let result = renderer.getRenderOutput();
    
    // Test the component.
    TestUtils.isElementOfType(result, Login);
    TestUtils.isCompositeComponent(result);
    
    // Test nested elements.
    expect(result.props.children.length).to.equal(3);
    expect(result.props.children[0].type).to.equal('h1');
  });
});