import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-option-preview',
  templateUrl: './option-preview.component.html',
  styleUrls: ['./option-preview.component.scss'],
})
export class OptionPreviewComponent {
  @Input()
  label: string = '';

  @Input()
  optionList: string[] = [];
}

@NgModule({
  declarations: [OptionPreviewComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [OptionPreviewComponent],
})
export class OptionPreviewModule {}
