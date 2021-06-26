import { Component, Input, NgModule, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MarkdownCreatorModule } from './markdown-creator/markdown-creator.component';
import { TextareaCreatorModule } from './textarea-creator/textarea-creator.component';
import { InputCreatorModule } from './input-creator/input-creator.component';
import { DropdownCreatorModule } from './dropdown-creator/dropdown-creator.component';
import { CheckboxesCreatorModule } from './checkboxes-creator/checkboxes-creator.component';
import { IssueFormGroup } from '../../forms/issue-form-group';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TopLevelCreatorModule } from './top-level-creator/top-level-creator.component';

@Component({
  selector: 'app-issue-creator',
  templateUrl: './issue-creator.component.html',
  styleUrls: ['./issue-creator.component.scss'],
})
export class IssueCreatorComponent {
  @Input()
  form: IssueFormGroup = new IssueFormGroup();

  labels = new Set(['bug']);
  assignees = new Set(['geromegrignon']);

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  @ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel> | undefined;

  get controls(): FormGroup[] {
    return (this.form.get('body') as FormArray).controls as FormGroup[];
  }

  addMarkdown(): void {
    this.form.addMarkdown();
  }

  addTextarea(): void {
    this.form.addTextarea();
  }

  addInput(): void {
    this.form.addInput();
  }

  addDropdown(): void {
    this.form.addDropdown();
  }

  addCheckboxes(): void {
    this.form.addCheckboxes();
  }

  addCheckBoxOption(index: number): void {
    this.form.addCheckboxOption(index);
  }

  deleteControl(index: number): void {
    this.form.deleteControl(index);
  }
}

@NgModule({
  declarations: [IssueCreatorComponent],
  imports: [
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MarkdownCreatorModule,
    TextareaCreatorModule,
    InputCreatorModule,
    DropdownCreatorModule,
    CheckboxesCreatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    TopLevelCreatorModule,
  ],
  exports: [IssueCreatorComponent],
})
export class IssueCreatorModule {}
