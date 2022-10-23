import { Component, Input, NgModule } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MarkdownSection } from '../../../models/markdown-section';
import { CommonModule } from '@angular/common';
import { MarkedModule } from '../../../pipes/marked.pipe';

@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
})
export class MarkdownPreviewComponent {
  @Input()
  formGroup!: UntypedFormGroup;

  get section(): MarkdownSection {
    return this.formGroup.value as MarkdownSection;
  }
}

@NgModule({
  declarations: [MarkdownPreviewComponent],
  imports: [CommonModule, MarkedModule],
  exports: [MarkdownPreviewComponent],
})
export class MarkdownPreviewModule {}
