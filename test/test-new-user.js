const React = require('react');
const TestUtils = require('react-addons-test-utils');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const Provider = require('react-redux').Provider;

const store = require('../js/store');
const actions = require('../js/actions/index');
const NewUser = require('../js/components/new-user');

describe('NewUser Component', () => {
  it('Renders the component',  () => {
    let renderer = TestUtils.createRenderer();
    let callback = () => {
      return true;
    };
    
    renderer.render(
      <NewUser />
    );
    let result = renderer.getRenderOutput();
    
    // Test the component.
    TestUtils.isElementOfType(result, NewUser);
    TestUtils.isCompositeComponent(result);
    
    // Test nested elements.
    expect(result.props.children.length).to.equal(2);
    expect(result.props.children[0].type).to.equal('h1');
  });
});