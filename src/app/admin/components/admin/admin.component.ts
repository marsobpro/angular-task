import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  dateNotInFuture,
  tagStartsWithHash,
} from '../../../shared/validators/validators';
import {
  ControlNames,
  ErrorMessages,
} from '../../enums/card-creation-form.enums';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllCards } from '../../../store/card/custom-card.selectors';
import * as CardActions from '../../../store/card/custom-card.actions';
import { Router } from '@angular/router';
import { ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: false,
})
export class AdminComponent {
  formSubmitted = false;
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [Validators.maxLength(255)]),
    imageLink: new FormControl('', [Validators.required]),
    videoLink: new FormControl('', [Validators.required]),
    creationDate: new FormControl('', [Validators.required, dateNotInFuture]),
    tags: new FormArray([this.createTag()]),
  });
  cards$: Observable<any[]>;

  constructor(private store: Store, private router: Router) {
    this.cards$ = this.store.select(selectAllCards);
  }

  get tagsControls(): AbstractControl[] {
    return (this.form.get('tags') as FormArray).controls;
  }

  createTag(): FormControl {
    return new FormControl('', [Validators.required, tagStartsWithHash]);
  }

  addTag(): void {
    if (this.tagsControls.length < 5) {
      (this.form.get('tags') as FormArray).push(this.createTag());
    }
  }

  removeTag(index: number): void {
    (this.form.get('tags') as FormArray).removeAt(index);
  }

  getErrorMessage(controlName: string): string | null {
    let control: AbstractControl | null = null;

    if (controlName.startsWith('tags_')) {
      const index = parseInt(controlName.split('_')[1], 10);
      control = this.tagsControls[index];
    } else {
      control = this.form.get(controlName);
    }

    if (!this.formSubmitted) {
      return null;
    }

    if (controlName === ControlNames.TITLE) {
      if (control?.hasError('required')) {
        return ErrorMessages.REQUIRED_TITLE;
      }
      if (control?.hasError('minlength')) {
        return ErrorMessages.MIN_LENGTH_TITLE;
      }
      if (control?.hasError('maxlength')) {
        return ErrorMessages.MAX_LENGTH_TITLE;
      }
    }

    if (
      controlName === ControlNames.DESCRIPTION &&
      control?.hasError('maxlength')
    ) {
      return ErrorMessages.MAX_LENGTH_DESCRIPTION;
    }

    if (controlName === ControlNames.IMAGE_LINK) {
      if (control?.hasError('required')) {
        return ErrorMessages.REQUIRED_IMAGE_LINK;
      }
    }

    if (controlName === ControlNames.VIDEO_LINK) {
      if (control?.hasError('required')) {
        return ErrorMessages.REQUIRED_VIDEO_LINK;
      }
    }

    if (controlName === ControlNames.CREATION_DATE) {
      if (control?.hasError('required')) {
        return ErrorMessages.REQUIRED_CREATION_DATE;
      }
      if (control?.hasError('dateInFuture')) {
        return ErrorMessages.DATE_IN_FUTURE;
      }
    }

    if (controlName.startsWith(ControlNames.TAGS)) {
      if (control?.hasError('required')) {
        return ErrorMessages.REQUIRED_TAG;
      }
      if (control?.hasError('tagInvalid')) {
        return ErrorMessages.TAG_INVALID;
      }
    }

    return null;
  }

  addCard(card: any) {
    this.store.dispatch(CardActions.createCard({ card }));
    this.router.navigate([ROUTES.HOME]);
  }

  deleteCard(id: string) {
    this.store.dispatch(CardActions.deleteCard({ id }));
  }

  onReset(): void {
    this.form.reset();
    this.formSubmitted = false;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const { title, description, imageLink, videoLink, creationDate, tags } =
      this.form.value;
    const newCard = {
      id: Math.random().toString(),
      title: title,
      description: description,
      imageLink: imageLink,
      videoLink: videoLink,
      publishedAt: creationDate,
      tags: tags,
    };
    this.addCard(newCard);
    alert('You added a custom card');
    this.form.reset();
  }
}
