import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from './SignUp';
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
  const wrapper = shallow(<SignUp {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'sign-up');
  const email = findByTestAttr(wrapper, 'email-field');
  const password = findByTestAttr(wrapper, 'password-field');
  const name = findByTestAttr(wrapper, 'name-field');
  const age = findByTestAttr(wrapper, 'age-field');
  const submit = findByTestAttr(wrapper, 'submit-button');

  expect(component.length).toBe(1);
  expect(email.length).toBe(1);
  expect(password.length).toBe(1);
  expect(name.length).toBe(1);
  expect(age.length).toBe(1);
  expect(submit.length).toBe(1);
});

test('renders without error messages at initial', () => {
  const wrapper = setup();
  const msgEmail = findByTestAttr(wrapper, 'msg-email');
  const msgPassword = findByTestAttr(wrapper, 'msg-password');
  const msgName = findByTestAttr(wrapper, 'msg-name');
  const msgAge = findByTestAttr(wrapper, 'msg-age');
  const msgFailure = findByTestAttr(wrapper, 'msg-failure');

  expect(msgEmail.length).toBe(0);
  expect(msgPassword.length).toBe(0);
  expect(msgName.length).toBe(0);
  expect(msgAge.length).toBe(0);
  expect(msgFailure.length).toBe(0);
});

describe('if submit without', () => {
  test('email errors', () => {
    const email = { value: '', error: 'error' };
    const wrapper = setup(null, { email });
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');
    wrapper.update();

    expect(wrapper.state().isSubmitted).toBe(false);
  });

  test('password errors', () => {
    const password = { value: '', error: 'error' };
    const wrapper = setup(null, { password });
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');
    wrapper.update();

    expect(wrapper.state().isSubmitted).toBe(false);
  });

  test('name errors', () => {
    const name = { value: '', error: 'error' };
    const wrapper = setup(null, { name });
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');
    wrapper.update();

    expect(wrapper.state().isSubmitted).toBe(false);
  });

  test('age errors', () => {
    const age = { value: '', error: 'error' };
    const wrapper = setup(null, { age });
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');
    wrapper.update();

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
    const passwordObj = { value: 'gonzs*2G', error: '' };
    const password = findByTestAttr(wrapper, 'password-field');
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs*2G' },
    });

    expect(wrapper.state().password).toMatchObject(passwordObj);
  });

  test('verify onChange event for name', () => {
    const nameObj = { value: 'gonzs', error: '' };
    const name = findByTestAttr(wrapper, 'name-field');
    name.simulate('change', {
      target: { id: 'name', value: 'gonzs' },
    });

    expect(wrapper.state().name).toMatchObject(nameObj);
  });

  test('verify onChange event for age', () => {
    const ageObj = { value: 18, error: '' };
    const password = findByTestAttr(wrapper, 'age-field');
    password.simulate('change', {
      target: { id: 'age', value: 18 },
    });

    expect(wrapper.state().age).toMatchObject(ageObj);
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

  test('is not empty', () => {
    email.simulate('change', {
      target: { id: 'email', value: '' },
    });
    const msgEmail = findByTestAttr(wrapper, 'msg-email');

    expect(msgEmail.text()).toContain('mandatory');
    expect(msgEmail.length).toBe(1);
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
      target: { id: 'password', value: 'gonzs*2S' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(0);
  });

  test('is not empty', () => {
    password.simulate('change', {
      target: { id: 'password', value: '' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('mandatory');
    expect(msgPassword.length).toBe(1);
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
      target: { id: 'password', value: 'Gon1zsSSSSSS' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });

  test('has wrong input 4', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Go3nzs*' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });

  test('has wrong input 5', () => {
    password.simulate('change', {
      target: { id: 'password', value: ',Gonzs2' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.text()).toContain('invalid');
    expect(msgPassword.length).toBe(1);
  });
});

describe('if name field', () => {
  let wrapper;
  let name;

  beforeEach(() => {
    wrapper = setup();
    name = findByTestAttr(wrapper, 'name-field');
  });
  test('has valid input', () => {
    name.simulate('change', {
      target: { id: 'name', value: 'gonzs' },
    });
    const msgName = findByTestAttr(wrapper, 'msg-name');

    expect(msgName.length).toBe(0);
  });

  test('is not empty', () => {
    name.simulate('change', {
      target: { id: 'name', value: '' },
    });
    const msgName = findByTestAttr(wrapper, 'msg-name');

    expect(msgName.text()).toContain('mandatory');
    expect(msgName.length).toBe(1);
  });

  test('has wrong input', () => {
    name.simulate('change', {
      target: { id: 'name', value: 'gonz' },
    });
    const msgName = findByTestAttr(wrapper, 'msg-name');

    expect(msgName.text()).toContain('invalid');
    expect(msgName.length).toBe(1);
  });
});

describe('if age field', () => {
  let wrapper;
  let age;

  beforeEach(() => {
    wrapper = setup();
    age = findByTestAttr(wrapper, 'age-field');
  });
  test('has valid input', () => {
    age.simulate('change', {
      target: { id: 'age', value: 18 },
    });
    const msgAge = findByTestAttr(wrapper, 'msg-age');

    expect(msgAge.length).toBe(0);
  });

  test('is not empty', () => {
    age.simulate('change', {
      target: { id: 'age', value: 0 },
    });
    const msgAge = findByTestAttr(wrapper, 'msg-age');

    expect(msgAge.text()).toContain('must be');
    expect(msgAge.length).toBe(1);
  });

  test('has wrong input', () => {
    age.simulate('change', {
      target: { id: 'age', value: 8 },
    });
    const msgAge = findByTestAttr(wrapper, 'msg-age');

    expect(msgAge.text()).toContain('must be');
    expect(msgAge.length).toBe(1);
  });
});
