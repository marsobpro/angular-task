import { Directive, ElementRef, Input } from '@angular/core';
import { TimePeriodDays } from '../../../shared/enums/time-period-in-days.enum';
import { CardColor } from '../../enums/results.enum';

@Directive({
  selector: '[appUploadAge]',
  standalone: true,
})
export class UploadAgeDirective {
  @Input() publishedAt = '' ;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const borderColor = this.getBorderColor(this.publishedAt);
    this.el.nativeElement.classList.add(borderColor);
  }

  getBorderColor(date: string) {
    const currentDate = new Date();
    const dateDifference = currentDate.getTime() - new Date(date).getTime();
    const differenceInDays = dateDifference / (1000 * 3600 * 24); // Converting to days

    if (differenceInDays > TimePeriodDays.HalfYear) {
      return CardColor.Red;
    } else if (
      differenceInDays >= TimePeriodDays.Month &&
      differenceInDays <= TimePeriodDays.HalfYear
    ) {
      return CardColor.Yellow;
    } else if (
      differenceInDays >= TimePeriodDays.Week &&
      differenceInDays <= TimePeriodDays.Month
    ) {
      return CardColor.Green;
    } else {
      return CardColor.Blue;
    }
  }
}
