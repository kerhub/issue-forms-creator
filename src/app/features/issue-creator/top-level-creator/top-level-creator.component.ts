import { Component, Input, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IssueFormGroup } from '../../../forms/issue-form-group';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-top-level-creator',
  templateUrl: './top-level-creator.component.html',
  styleUrls: ['./top-level-creator.component.scss'],
})
export class TopLevelCreatorComponent {
  @Input()
  form!: FormGroup;

  labels = new Set(['bug']);
  assignees = new Set(['geromegrignon']);
  separatorKeysCodes: number[] = [ENTER, COMMA];

  addLabels(): void {
    (this.form as IssueFormGroup).addLabels();
  }

  addAssignees(): void {
    (this.form as IssueFormGroup).addAssignees();
  }

  addLabelFromInput(event: MatChipInputEvent): void {
    if (event.value) {
      this.labels.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeLabel(label: string): void {
    this.labels.delete(label);
  }

  addAssigneeFromInput(event: MatChipInputEvent): void {
    if (event.value) {
      this.assignees.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeAssignee(assignee: string): void {
    this.assignees.delete(assignee);
  }
}

@NgModule({
  declarations: [TopLevelCreatorComponent],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [TopLevelCreatorComponent],
})
export class TopLevelCreatorModule {}
