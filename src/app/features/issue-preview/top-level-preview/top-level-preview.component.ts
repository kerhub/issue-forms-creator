import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}

@NgModule({
  declarations: [TopLevelPreviewComponent],
  imports: [CommonModule],
  exports: [TopLevelPreviewComponent],
})
export class TopLevelPreviewModule {}
