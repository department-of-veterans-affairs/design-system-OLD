import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { axeCheck } from '../../../lib/testing/helpers';

import AdditionalInfo from './AdditionalInfo.jsx';

describe('<AdditionalInfo/>', () => {
  let wrapper;
  // for the sake of more tests could be written
  // declared beforeEach and assigned to wrapper
  beforeEach(() => {
    wrapper = mount(<AdditionalInfo triggerText="test"/>);
  });

  it('should render', () => {
    expect(wrapper.text()).to.contain('test');
  });
  it('should pass aXe check', () => {
    return axeCheck(<AdditionalInfo triggerText="test"/>);
  });
});
