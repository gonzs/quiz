const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[.!@#$%^&*])[\w.!@#$%^&*]{8,}/;
const nameRegex = /\S{5,}/;

export const checkValue = (type, value) => {
  if (value.length === 0) return `${type} is mandatory`;

  switch (type) {
    case 'email':
      if (!emailRegex.test(value)) return `${type} with invalid format`;
      break;

    case 'password':
      if (!passwordRegex.test(value)) return `${type} with invalid format`;
      break;

    case 'displayname':
      if (!nameRegex.test(value)) return `${type} with invalid format`;
      break;

    case 'age':
      if (parseInt(value) < 18) return 'You must be 18 years old';
      break;

    default:
      break;
  }

  return '';
};

export const checkPasswordConfirmation = (pass, conf) => {
  if (pass !== conf) return `Passwords are not equal`;
  return '';
};
