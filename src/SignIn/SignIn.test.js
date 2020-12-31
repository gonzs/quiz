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
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<SignIn {...setupProps} />);
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

describe('if submit without', () => {
  let mockSetState = jest.fn();

  beforeEach(() => {
    mockSetState.mockClear();
  });

  test('email errors', () => {
    React.useState = jest.fn(() => [
      {
        email: { value: '', error: 'error' },
        password: { value: '', error: '' },
        isSubmitted: false,
        success: true,
      },
      mockSetState,
    ]);
    const wrapper = setup();

    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: '', error: 'error' },
      password: { value: '', error: '' },
      isSubmitted: false,
      success: true,
    });
  });

  test('password errors', () => {
    React.useState = jest.fn(() => [
      {
        email: { value: '', error: '' },
        password: { value: '', error: 'error' },
        isSubmitted: false,
        success: true,
      },
      mockSetState,
    ]);
    const wrapper = setup();

    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: '', error: '' },
      password: { value: '', error: 'error' },
      isSubmitted: false,
      success: true,
    });
  });
});

describe('if onChange event', () => {
  let mockSetState = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetState.mockClear();
    React.useState = jest.fn(() => [
      {
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        isSubmitted: false,
        success: true,
      },
      mockSetState,
    ]);
    wrapper = setup();
  });

  test('verify onChange event for email', () => {
    const email = findByTestAttr(wrapper, 'email-field');
    email.simulate('change', {
      target: { id: 'email', value: 'gonzs@gonzs.com' },
    });

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: 'gonzs@gonzs.com', error: '' },
      password: { value: '', error: '' },
      isSubmitted: false,
      success: true,
    });
  });

  test('verify onChange event for password', () => {
    const password = findByTestAttr(wrapper, 'password-field');
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs*2G' },
    });

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: '', error: '' },
      password: { value: 'gonzs*2G', error: '' },
      isSubmitted: false,
      success: true,
    });
  });
});

describe('After Submit event', () => {
  let mockSetState = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetState.mockClear();
  });

  test('no renders error message for valid login', () => {
    React.useState = jest.fn(() => [
      {
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        isSubmitted: true,
        success: true,
      },
      mockSetState,
    ]);
    wrapper = setup();
    const msgSubmit = findByTestAttr(wrapper, 'msg-failure');

    expect(msgSubmit.length).toBe(0);
  });

  test('renders error message for invalid login', () => {
    React.useState = jest.fn(() => [
      {
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        isSubmitted: true,
        success: false,
      },
      mockSetState,
    ]);
    wrapper = setup();
    const msgSubmit = findByTestAttr(wrapper, 'msg-failure');

    expect(msgSubmit.length).toBe(1);
  });
});

describe('if email field', () => {
  let wrapper;
  let mockSetState = jest.fn();

  beforeEach(() => {
    mockSetState.mockClear();
    React.useState = jest.fn(() => [
      {
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        isSubmitted: false,
        success: true,
      },
      mockSetState,
    ]);
    wrapper = setup();
  });

  test('has valid input', () => {
    const email = findByTestAttr(wrapper, 'email-field');
    email.simulate('change', {
      target: { id: 'email', value: 'gonzs@gonzs.com' },
    });

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: 'gonzs@gonzs.com', error: '' },
      password: { value: '', error: '' },
      isSubmitted: false,
      success: true,
    });
  });

  test('has wrong input', () => {
    const email = findByTestAttr(wrapper, 'email-field');
    email.simulate('change', {
      target: { id: 'email', value: 'gonzs' },
    });

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: 'gonzs', error: 'email with invalid format' },
      password: { value: '', error: '' },
      isSubmitted: false,
      success: true,
    });
  });
});

describe('if password field', () => {
  let wrapper;
  let mockSetState = jest.fn();

  beforeEach(() => {
    mockSetState.mockClear();
    React.useState = jest.fn(() => [
      {
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        isSubmitted: false,
        success: true,
      },
      mockSetState,
    ]);
    wrapper = setup();
  });

  test('has valid input', () => {
    const password = findByTestAttr(wrapper, 'password-field');
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs*2F' },
    });

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: '', error: '' },
      password: { value: 'gonzs*2F', error: '' },
      isSubmitted: false,
      success: true,
    });
  });

  test('has wrong input', () => {
    const password = findByTestAttr(wrapper, 'password-field');
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs' },
    });

    expect(mockSetState).toHaveBeenCalledWith({
      email: { value: '', error: '' },
      password: { value: 'gonzs', error: 'password with invalid format' },
      isSubmitted: false,
      success: true,
    });
  });
});
