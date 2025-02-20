import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appUploadAge]',
  standalone: true,
})
export class UploadAgeDirective {
  @Input() publishedAt = '';
  monthDaysCount = 30;
  weekDaysCount = 7;
  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const borderColor = this.getBorderColor(this.publishedAt);
    this.el.nativeElement.classList.add(borderColor);
  }

  getBorderColor(date: string) {
    const currentDate = new Date();
    const dateDifference = currentDate.getTime() - new Date(date).getTime();
    const differenceInDays = dateDifference / (1000 * 3600 * 24);

    if (differenceInDays > 180) {
      return 'red';
    } else if (differenceInDays >= 30 && differenceInDays <= 180) {
      return 'yellow';
    } else if (differenceInDays >= 7 && differenceInDays <= 30) {
      return 'green';
    } else {
      return 'blue';
    }
  }
}
