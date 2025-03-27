import { AbstractControl } from '@angular/forms';

export default function passwordStrengthValidator(control: AbstractControl) {
  const password = control.value;

  const minLength = /.{8,}/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#?$%^&*(),.]/;

  if (!minLength.test(password)) {
    return {
      passwordStrength: 'Your password must be at least 8 characters long.',
    };
  }
  if (!hasUpperCase.test(password)) {
    return {
      passwordStrength:
        'Your password must contain at least one uppercase letter.',
    };
  }
  if (!hasLowerCase.test(password)) {
    return {
      passwordStrength:
        'Your password must contain at least one lowercase letter.',
    };
  }
  if (!hasNumber.test(password)) {
    return {
      passwordStrength: 'Your password must contain at least one number.',
    };
  }
  if (!hasSpecialChar.test(password)) {
    return {
      passwordStrength:
        'Your password must contain at least one special character (e.g., ! @ # ? ]).',
    };
  }

  return null;
}
