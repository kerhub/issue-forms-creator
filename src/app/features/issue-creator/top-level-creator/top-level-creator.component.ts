import { Component, Input, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IssueFormGroup } from '../../../forms/issue-form-group';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-top-level-creator',
  templateUrl: './top-level-creator.component.html',
  styleUrls: ['./top-level-creator.component.scss'],
})
export class TopLevelCreatorComponent {
  @Input()
  form!: FormGroup;

  labelsControl: FormControl = new FormControl(null);
  assigneesControl: FormControl = new FormControl(null);

  labels = new Set<string>();
  assignees = new Set<string>();
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
      this.form.get('labels')?.setValue(Array.from(this.labels));
      event.chipInput!.clear();
    }
  }

  removeLabel(label: string): void {
    this.labels.delete(label);
  }

  addAssigneeFromInput(event: MatChipInputEvent): void {
    if (event.value) {
      this.assignees.add(event.value);
      this.form.get('assignees')?.setValue(Array.from(this.assignees));
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
    MatExpansionModule,
  ],
  exports: [TopLevelCreatorComponent],
})
export class TopLevelCreatorModule {}
