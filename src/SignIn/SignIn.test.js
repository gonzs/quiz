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
  const email = '';
  const isSubmitted = true;
  const wrapper = setup(null, { email, isSubmitted });
  const submit = findByTestAttr(wrapper, 'submit-button');
  submit.simulate('click');
  const msgEmail = findByTestAttr(wrapper, 'msg-email');

  expect(msgEmail.length).toBe(1);
});

test('if submit without password value', () => {
  const password = '';
  const isSubmitted = true;
  const wrapper = setup(null, { password, isSubmitted });
  const submit = findByTestAttr(wrapper, 'submit-button');
  submit.simulate('click');
  const msgPassword = findByTestAttr(wrapper, 'msg-password');

  expect(msgPassword.length).toBe(1);
});

test('verify onChange event for email', () => {
  const wrapper = setup();
  const email = findByTestAttr(wrapper, 'email-field');
  email.simulate('change', {
    target: { id: 'email', value: 'gonzs@gonzs.com' },
  });

  expect(wrapper.state().email).toBe('gonzs@gonzs.com');
});

test('verify onChange event for password', () => {
  const wrapper = setup();
  const password = findByTestAttr(wrapper, 'password-field');
  password.simulate('change', { target: { id: 'password', value: '12345' } });

  expect(wrapper.state().password).toBe('12345');
});

test('no renders error message for valid login', () => {
  const isLogin = true;
  const isSubmitted = true;
  const wrapper = setup(null, { isSubmitted, isLogin });
  const msgSubmit = findByTestAttr(wrapper, 'msg-failure');

  expect(msgSubmit.length).toBe(0);
});

test('renders error message for invalid login', () => {
  const isLogin = false;
  const isSubmitted = true;
  const wrapper = setup(null, { isSubmitted, isLogin });
  const msgSubmit = findByTestAttr(wrapper, 'msg-failure');

  expect(msgSubmit.length).toBe(1);
});
