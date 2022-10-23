import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-option',
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.scss'],
})
export class ListOptionComponent {
  @Input()
  form!: UntypedFormGroup;

  @Input()
  removable: boolean = false;

  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  addOption: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('input', { read: ElementRef })
  input!: ElementRef;

  focus(): void {
    this.input.nativeElement.focus();
  }
}

@NgModule({
  declarations: [ListOptionComponent],
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, DragDropModule, CommonModule],
  exports: [ListOptionComponent],
})
export class ListOptionModule {}
