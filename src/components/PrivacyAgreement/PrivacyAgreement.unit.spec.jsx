import React from 'react';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { mount } from 'enzyme';
import { axeCheck } from '../../../lib/testing/helpers';
import PrivacyAgreement from './PrivacyAgreement.jsx';

chai.use(chaiAsPromised);
const { expect } = chai;
/* eslint-disable no-unused-vars */
describe('<PrivacyAgreement/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <PrivacyAgreement
        checked
        onChange={e => {
          e.target.checked;
        }}/>
    );
  });
  it('should render', () => {
    expect(wrapper.text()).to.eql('I have read and accept the privacy policy*');
  });

  it('should pass aXe check', () => {
    return axeCheck(<PrivacyAgreement checked onChange={() => {}}/>);
  });
  it('ErrorableCheckbox should be checked if props.checked = true', () => {
    const checkBox = wrapper.find('[type="checkbox"]').props();
    expect(checkBox.checked).to.be.true;
    expect(checkBox.onChange).to.be.a('function');
  });

  it('no error styles when errorMessage undefined', () => {
    // No error classes.
    expect(wrapper.children('.usa-input-error')).to.have.lengthOf(0);
    expect(wrapper.children('.usa-input-error-label')).to.have.lengthOf(0);
    expect(wrapper.children('.usa-input-error-message')).to.have.lengthOf(0);
  });
  /* eslint-enable no-unused-vars */
});
