import { Directive, ElementRef, Input } from '@angular/core';
import { TimePeriodDays } from '../../shared/enums/time-period-in-days.enum';

@Directive({
  selector: '[appUploadAge]',
  standalone: false,
})
export class UploadAgeDirective {
  @Input() publishedAt = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const borderColor = this.getBorderColor(this.publishedAt);
    this.el.nativeElement.classList.add(borderColor);
  }

  getBorderColor(date: string) {
    const currentDate = new Date();
    const dateDifference = currentDate.getTime() - new Date(date).getTime();
    const differenceInDays = dateDifference / (1000 * 3600 * 24);

    if (differenceInDays > TimePeriodDays.HalfYear) {
      return 'red';
    } else if (
      differenceInDays >= TimePeriodDays.Month &&
      differenceInDays <= TimePeriodDays.HalfYear
    ) {
      return 'yellow';
    } else if (
      differenceInDays >= TimePeriodDays.Week &&
      differenceInDays <= TimePeriodDays.Month
    ) {
      return 'green';
    } else {
      return 'blue';
    }
  }
}
