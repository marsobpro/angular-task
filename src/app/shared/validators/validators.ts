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

export function dateNotInFuture(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const enteredDate = new Date(control.value);
  const currentDate = new Date();

  if (enteredDate > currentDate) {
    return { dateInFuture: true };
  }

  return null;
}

export function dateNotEarlierThan(year: number) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { invalidDate: true };
    }
    const minDate = new Date(year, 0, 1); // January 1st of the specified year
    if (date < minDate) {
      // Format the minDate to a more readable string
      const formattedMinDate = minDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return { dateTooEarly: { minDate: formattedMinDate } };
    }
    return null;
  };
}

export function validUrl() {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const url = control.value;

    // Regex to validate URLs with or without protocol and www prefix
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return urlPattern.test(url) ? null : { invalidUrl: true };
  };
}
