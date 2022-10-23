import { Component, EventEmitter, HostBinding, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input()
  errorMessage = 'Missing label';

  @Input()
  hasLink: boolean = true;

  @Output()
  scrollToError: EventEmitter<void> = new EventEmitter<void>();

  @Input() @HostBinding('class.error-message-border') isPreview: boolean = false;
}

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ErrorMessageComponent],
})
export class ErrorMessageModule {}
