import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function passwordStrengthValidator(control: AbstractControl) {
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

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, passwordStrengthValidator],
    }),
  });
  submitted = false;
  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.submitted = true;
    const { email, password } = this.form.value;
    const emailValue = email ?? '';
    const passwordValue = email ?? '';

    if (this.form.invalid) {
      return;
    }
    this.authService.login(emailValue, passwordValue);
  }
}
