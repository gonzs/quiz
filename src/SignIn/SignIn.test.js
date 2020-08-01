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

describe('if submit without values', () => {
  test('submit without email value', () => {
    const email = { value: '', error: '' };
    const wrapper = setup(null, { email });
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');

    expect(wrapper.state().isSubmitted).toBe(false);
  });

  test('submit without password value', () => {
    const password = { value: '', error: '' };
    const wrapper = setup(null, { password });
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');

    expect(wrapper.state().isSubmitted).toBe(false);
  });
});

describe('if onChange event', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test('verify onChange event for email', () => {
    const emailObj = { value: 'gonzs@gonzs.com', error: '' };
    const email = findByTestAttr(wrapper, 'email-field');
    email.simulate('change', {
      target: { id: 'email', value: 'gonzs@gonzs.com' },
    });

    expect(wrapper.state().email).toMatchObject(emailObj);
  });

  test('verify onChange event for password', () => {
    const passwordObj = { value: 'Gonzs*2', error: '' };
    const password = findByTestAttr(wrapper, 'password-field');
    password.simulate('change', {
      target: { id: 'password', value: 'Gonzs*2' },
    });

    expect(wrapper.state().password).toMatchObject(passwordObj);
  });
});

describe('After Submit event', () => {
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
});

describe('if email field', () => {
  let wrapper;
  let email;

  beforeEach(() => {
    wrapper = setup();
    email = findByTestAttr(wrapper, 'email-field');
  });
  test('has valid input', () => {
    email.simulate('change', {
      target: { id: 'email', value: 'gonzs@gonzs.com' },
    });
    const msgEmail = findByTestAttr(wrapper, 'msg-email');

    expect(msgEmail.length).toBe(0);
  });

  test('has wrong input', () => {
    email.simulate('change', {
      target: { id: 'email', value: 'gonzs' },
    });
    const msgEmail = findByTestAttr(wrapper, 'msg-email');

    expect(msgEmail.text()).toContain('invalid');
    expect(msgEmail.length).toBe(1);
  });
});

describe('if password field', () => {
  let wrapper;
  let password;

  beforeEach(() => {
    wrapper = setup();
    password = findByTestAttr(wrapper, 'password-field');
  });

  test('has valid input', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Gonzs*2' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(0);
  });
  test('has wrong input 1', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });

  test('has wrong input 2', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Gonzs' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });

  test('has wrong input 3', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Gon1zs' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });

  test('has wrong input 4', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Gonzs*' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });

  test('has wrong input 5', () => {
    password.simulate('change', {
      target: { id: 'password', value: '*Gonzs2' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });
});
