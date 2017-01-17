const React = require('react');
const Validation = require('react-validation').default;
const validator = require('validator');

Object.assign(Validation.rules, {
  required: {
    rule: (value) => value.toString().trim(),
    hint: () => <span className="form-error is-visible">Required</span>
  },
  email: {
    rule: (value) => validator.isEmail(value.toString()),
    hint: (value) => <span className="form-error is-visible">{value} is not an Email.</span>
  },
  password: {
    rule: (value, components) => {
      const password = components.password.state;
      const passwordConfirm = components.passwordConfirm.state;
      const isBothUsed = password
        && passwordConfirm
        && password.isUsed
        && passwordConfirm.isUsed;
      const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;
  
      if (!isBothUsed || !isBothChanged) {
        return true;
      }
  
      return password.value === passwordConfirm.value;
    },
    hint: () => <span className="form-error is-visible">The passwords do not match.</span>
  }
});

module.exports = Validation;