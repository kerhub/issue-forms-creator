import { Component, Input, NgModule } from '@angular/core';
import { TextareaElement } from '../../../models/textarea-element';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkedModule } from '../../../pipes/marked.pipe';

@Component({
  selector: 'app-textarea-preview',
  templateUrl: './textarea-preview.component.html',
  styleUrls: ['./textarea-preview.component.scss'],
})
export class TextareaPreviewComponent {
  @Input()
  formGroup!: FormGroup;

  get element(): TextareaElement {
    return this.formGroup.value as TextareaElement;
  }
}

@NgModule({
  declarations: [TextareaPreviewComponent],
  imports: [CommonModule, MarkedModule],
  exports: [TextareaPreviewComponent],
})
export class TextareaPreviewModule {}
