import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-top-level-preview',
  templateUrl: './top-level-preview.component.html',
  styleUrls: ['./top-level-preview.component.scss'],
})
export class TopLevelPreviewComponent {
  @Input()
  name: string = '';

  @Input()
  description: string = '';

  @Input()
  title: string = '';

  @Output()
  scrollToError: EventEmitter<void> = new EventEmitter<void>();
}

@NgModule({
  declarations: [TopLevelPreviewComponent],
  imports: [CommonModule, ErrorMessageModule],
  exports: [TopLevelPreviewComponent],
})
export class TopLevelPreviewModule {}
