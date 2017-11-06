import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../../lib/testing/helpers';

import Modal from './Modal.jsx';

describe('<Modal/>', () => {
  it('should render', () => {
    const tree = mount(<Modal/>);
  });

  it('should run aXe check', (done) => {
    const tree = mount(<Modal/>);
    axeCheck(done);
  }).timeout(5000);
});
