import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appIssueForm]',
})
export class IssueFormDirective {
  @Input()
  formGroup!: FormGroup;

  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();
}
