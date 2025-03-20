import { AbstractControl } from '@angular/forms';

export function tagStartsWithHash(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const value = control.value;

  if (value && !value.startsWith('#')) {
    return { tagInvalid: true };
  }
  return null;
}

export function dateNotInFuture(control: AbstractControl) {
  const enteredDate = new Date(control.value);
  const currentDate = new Date();

  if (enteredDate > currentDate) {
    return { dateInFuture: true };
  }

  return null;
}
