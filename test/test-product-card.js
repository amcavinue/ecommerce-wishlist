const React = require('react');
const TestUtils = require('react-addons-test-utils');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const Provider = require('react-redux').Provider;

const store = require('../js/store');
const actions = require('../js/actions/index');
const ProductCard = require('../js/components/product-card');

describe('ProductCard Component', () => {
  it('Renders the component',  () => {
    let renderer = TestUtils.createRenderer();
    let callback = () => {
      return true;
    };
    
    renderer.render(
      <ProductCard itemClass={'grid-group-item'} title={'Product title'} img={'http://placehold.it/400x250/000/fff'} price={25} description={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'} />
    );
    let result = renderer.getRenderOutput();
    
    // Test the component.
    TestUtils.isElementOfType(result, ProductCard);
    TestUtils.isCompositeComponent(result);
    
    // Test nested elements.
    /*expect(result.props.children.length).to.equal(2);
    expect(result.props.children[0].type).to.equal('h1');*/
  });
});