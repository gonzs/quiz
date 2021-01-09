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
  const confPassword = findByTestAttr(wrapper, 'confirm-password-field');
  const displayName = findByTestAttr(wrapper, 'display-name-field');
  const age = findByTestAttr(wrapper, 'age-field');
  const submit = findByTestAttr(wrapper, 'submit-button');

  expect(component.length).toBe(1);
  expect(email.length).toBe(1);
  expect(password.length).toBe(1);
  expect(confPassword.length).toBe(1);
  expect(displayName.length).toBe(1);
  expect(age.length).toBe(1);
  expect(submit.length).toBe(1);
});

test('renders without error messages at initial', () => {
  const wrapper = setup();
  const msgEmail = findByTestAttr(wrapper, 'msg-email');
  const msgPassword = findByTestAttr(wrapper, 'msg-password');
  const msgConfPassword = findByTestAttr(wrapper, 'msg-conf-password');
  const msgDisplayName = findByTestAttr(wrapper, 'msg-display-name');
  const msgAge = findByTestAttr(wrapper, 'msg-age');
  const msgFailure = findByTestAttr(wrapper, 'msg-failure');

  expect(msgEmail.length).toBe(0);
  expect(msgPassword.length).toBe(0);
  expect(msgConfPassword.length).toBe(0);
  expect(msgDisplayName.length).toBe(0);
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

  test('confirm password errors', () => {
    const confpassword = { value: '', error: '' };
    const wrapper = setup(null, { confpassword });
    const submit = findByTestAttr(wrapper, 'submit-button');
    submit.simulate('click');
    wrapper.update();

    expect(wrapper.state().isSubmitted).toBe(false);
  });

  test('display name errors', () => {
    const displayname = { value: '', error: 'error' };
    const wrapper = setup(null, { displayname });
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

  test('verify onChange event for confirm password', () => {
    const confPasswordObj = { value: 'gonzs*2G', error: '' };
    const confPassword = findByTestAttr(wrapper, 'confirm-password-field');
    confPassword.simulate('change', {
      target: { id: 'confpassword', value: 'gonzs*2G' },
    });

    expect(wrapper.state().confpassword).toMatchObject(confPasswordObj);
  });

  test('verify onChange event for display name', () => {
    const displayNameObj = { value: 'gonzs', error: '' };
    const displayName = findByTestAttr(wrapper, 'display-name-field');
    displayName.simulate('change', {
      target: { id: 'displayname', value: 'gonzs' },
    });

    expect(wrapper.state().displayname).toMatchObject(displayNameObj);
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

  test('is empty', () => {
    email.simulate('change', {
      target: { id: 'email', value: '' },
    });
    const msgEmail = findByTestAttr(wrapper, 'msg-email');

    expect(msgEmail.length).toBe(1);
    expect(msgEmail.text()).toContain('mandatory');
  });

  test('has wrong input', () => {
    email.simulate('change', {
      target: { id: 'email', value: 'gonzs' },
    });
    const msgEmail = findByTestAttr(wrapper, 'msg-email');

    expect(msgEmail.length).toBe(1);
    expect(msgEmail.text()).toContain('invalid');
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
      target: { id: 'password', value: 'gonzs*2G' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(0);
  });

  test('is empty', () => {
    password.simulate('change', {
      target: { id: 'password', value: '' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(1);
    expect(msgPassword.text()).toContain('mandatory');
  });

  test('has wrong input 1', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(1);
    expect(msgPassword.text()).toContain('invalid');
  });

  test('has wrong input 2', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Gonzs' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(1);
    expect(msgPassword.text()).toContain('invalid');
  });

  test('has wrong input 3', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Gon1zsSSSSSS' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(1);
    expect(msgPassword.text()).toContain('invalid');
  });

  test('has wrong input 4', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'Go3nzs*' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(1);
    expect(msgPassword.text()).toContain('invalid');
  });

  test('has wrong input 5', () => {
    password.simulate('change', {
      target: { id: 'password', value: ',Gonzs2' },
    });
    const msgPassword = findByTestAttr(wrapper, 'msg-password');

    expect(msgPassword.length).toBe(1);
    expect(msgPassword.text()).toContain('invalid');
  });
});

describe('if confirm password field', () => {
  let wrapper;
  let password;
  let confPassword;

  beforeEach(() => {
    wrapper = setup();
    password = findByTestAttr(wrapper, 'password-field');
    confPassword = findByTestAttr(wrapper, 'confirm-password-field');
  });

  test('has valid input', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs*2G' },
    });

    confPassword.simulate('change', {
      target: { id: 'conf-password', value: 'gonzs*2G' },
    });
    const msgConfPassword = findByTestAttr(wrapper, 'msg-conf-password');

    expect(msgConfPassword.length).toBe(0);
  });

  test('is empty', () => {
    confPassword.simulate('change', {
      target: { id: 'confpassword', value: '' },
    });
    const msgConfPassword = findByTestAttr(wrapper, 'msg-conf-password');

    expect(msgConfPassword.length).toBe(1);
    expect(msgConfPassword.text()).toContain('mandatory');
  });

  test('has wrong input', () => {
    password.simulate('change', {
      target: { id: 'password', value: 'gonzs*2G' },
    });
    confPassword.simulate('change', {
      target: { id: 'confpassword', value: 'gonzs*2H' },
    });
    const msgConfPassword = findByTestAttr(wrapper, 'msg-conf-password');

    expect(msgConfPassword.length).toBe(1);
    expect(msgConfPassword.text()).toContain('equal');
  });
});

describe('if display name field', () => {
  let wrapper;
  let displayName;

  beforeEach(() => {
    wrapper = setup();
    displayName = findByTestAttr(wrapper, 'display-name-field');
  });
  test('has valid input', () => {
    displayName.simulate('change', {
      target: { id: 'display-name', value: 'gonzs' },
    });
    const msgDisplayName = findByTestAttr(wrapper, 'msg-display-name');

    expect(msgDisplayName.length).toBe(0);
  });

  test('is empty', () => {
    displayName.simulate('change', {
      target: { id: 'displayname', value: '' },
    });
    const msgDisplayName = findByTestAttr(wrapper, 'msg-display-name');

    expect(msgDisplayName.length).toBe(1);
    expect(msgDisplayName.text()).toContain('mandatory');
  });

  test('has wrong input', () => {
    displayName.simulate('change', {
      target: { id: 'displayname', value: 'gonz' },
    });
    const msgDisplayName = findByTestAttr(wrapper, 'msg-display-name');

    expect(msgDisplayName.length).toBe(1);
    expect(msgDisplayName.text()).toContain('invalid');
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

  test('is empty', () => {
    age.simulate('change', {
      target: { id: 'age', value: 0 },
    });
    const msgAge = findByTestAttr(wrapper, 'msg-age');

    expect(msgAge.length).toBe(1);
    expect(msgAge.text()).toContain('must be');
  });

  test('has wrong input', () => {
    age.simulate('change', {
      target: { id: 'age', value: 8 },
    });
    const msgAge = findByTestAttr(wrapper, 'msg-age');

    expect(msgAge.length).toBe(1);
    expect(msgAge.text()).toContain('must be');
  });
});
