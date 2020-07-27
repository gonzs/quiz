import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './SignIn';
import { findByTestAttr } from '../Test/testUtils';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {};

/**
 *  Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<SignIn {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'sign-in');
  expect(component.length).toBe(1);
  const email = findByTestAttr(wrapper, 'email-field');
  expect(email.length).toBe(1);
  const password = findByTestAttr(wrapper, 'password-field');
  expect(password.length).toBe(1);
  const submit = findByTestAttr(wrapper, 'submit-button');
  expect(submit.length).toBe(1);
});

test('if submit without email value', () => {
  const email = '';
  const wrapper = setup(null, { email });
  const submit = findByTestAttr(wrapper, 'submit-button');
  submit.simulate('click');

  const msgEmail = findByTestAttr(wrapper, 'message-email-field');
  expect(msgEmail.length).toBe(1);
});
test('if submit without password value', () => {});
test('if submit with correct values', () => {});
test('if submit with wrong values', () => {});
test('renders error message for invalid login', () => {});
