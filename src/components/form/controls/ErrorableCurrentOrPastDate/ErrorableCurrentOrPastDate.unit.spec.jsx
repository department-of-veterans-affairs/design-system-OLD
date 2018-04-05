// add axe checks
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../../../../lib/testing/helpers';

import ErrorableCurrentOrPastDate from './ErrorableCurrentOrPastDate';
import { makeField } from '../../../../helpers/fields.js';

describe('<ErrorableCurrentOrPastDate>', () => {
  it('passes in failed validation object', () => {
    const date = {
      day: makeField('3'),
      month: makeField('5'),
      year: makeField('2100')
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;

    const tree = mount(
      <ErrorableCurrentOrPastDate date={date} onValueChange={(_update) => {}}/>);

    expect(tree.childAt(0).prop('validation').valid).to.be.false;
    expect(tree.childAt(0).prop('validation').message).to.equal('Please provide a valid date in the past');
  });
  it('should pass aXe check', () => {
    const date = {
      day: makeField('3'),
      month: makeField('5'),
      year: makeField('2100')
    };
    date.year.dirty = true;
    date.month.dirty = true;
    date.day.dirty = true;
    return axeCheck(
      <ErrorableCurrentOrPastDate date={date} onValueChange={(_update) => {}}/>
    );
  });
});

