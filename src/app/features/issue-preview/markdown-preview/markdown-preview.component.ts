import { Component, Input, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MarkdownElement } from '../../../models/markdown-element';
import { CommonModule } from '@angular/common';
import { MarkedModule } from '../../../pipes/marked.pipe';

@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
})
export class MarkdownPreviewComponent {
  @Input()
  formGroup!: FormGroup;

  get element(): MarkdownElement {
    return this.formGroup.value as MarkdownElement;
  }
}

@NgModule({
  declarations: [MarkdownPreviewComponent],
  imports: [CommonModule, MarkedModule],
  exports: [MarkdownPreviewComponent],
})
export class MarkdownPreviewModule {}
