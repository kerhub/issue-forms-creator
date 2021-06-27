import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-checkbox-option',
  templateUrl: './checkbox-option.component.html',
  styleUrls: ['./checkbox-option.component.scss'],
})
export class CheckboxOptionComponent {
  @Input()
  form!: FormGroup;

  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();
}

@NgModule({
  declarations: [CheckboxOptionComponent],
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, DragDropModule],
  exports: [CheckboxOptionComponent],
})
export class CheckboxOptionModule {}
