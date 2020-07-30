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
  const email = findByTestAttr(wrapper, 'email-field');
  const password = findByTestAttr(wrapper, 'password-field');
  const submit = findByTestAttr(wrapper, 'submit-button');

  expect(component.length).toBe(1);
  expect(email.length).toBe(1);
  expect(password.length).toBe(1);
  expect(submit.length).toBe(1);
});

test('renders without error messages at initial', () => {
  const wrapper = setup();
  const msgEmail = findByTestAttr(wrapper, 'msg-email');
  const msgPassword = findByTestAttr(wrapper, 'msg-password');
  const msgFailure = findByTestAttr(wrapper, 'msg-failure');

  expect(msgEmail.length).toBe(0);
  expect(msgPassword.length).toBe(0);
  expect(msgFailure.length).toBe(0);
});

test('if submit without email value', () => {
  const email = { value: '', error: '' };
  const wrapper = setup(null, { email });
  const submit = findByTestAttr(wrapper, 'submit-button');
  submit.simulate('click');

  expect(wrapper.state().isSubmitted).toBe(false);
});

test('if submit without password value', () => {
  const password = { value: '', error: '' };
  const wrapper = setup(null, { password });
  const submit = findByTestAttr(wrapper, 'submit-button');
  submit.simulate('click');

  expect(wrapper.state().isSubmitted).toBe(false);
});

test('verify onChange event for email', () => {
  const emailObj = { value: 'gonzs@gonzs.com', error: '' };
  const wrapper = setup();
  const email = findByTestAttr(wrapper, 'email-field');
  email.simulate('change', {
    target: { id: 'email', value: 'gonzs@gonzs.com' },
  });

  expect(wrapper.state().email).toMatchObject(emailObj);
});

test('verify onChange event for password', () => {
  const passwordObj = { value: '12345', error: '' };
  const wrapper = setup();
  const password = findByTestAttr(wrapper, 'password-field');
  password.simulate('change', { target: { id: 'password', value: '12345' } });

  expect(wrapper.state().password).toMatchObject(passwordObj);
});

test('no renders error message for valid login', () => {
  const success = true;
  const isSubmitted = true;
  const wrapper = setup(null, { isSubmitted, success });
  const msgSubmit = findByTestAttr(wrapper, 'msg-failure');

  expect(msgSubmit.length).toBe(0);
});

test('renders error message for invalid login', () => {
  const success = false;
  const isSubmitted = true;
  const wrapper = setup(null, { isSubmitted, success });
  const msgSubmit = findByTestAttr(wrapper, 'msg-failure');

  expect(msgSubmit.length).toBe(1);
});
