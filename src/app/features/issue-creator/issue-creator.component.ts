import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgModule,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
import { RepositoryFinderModule } from '../repository-finder/repository-finder.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-issue-creator',
  templateUrl: './issue-creator.component.html',
  styleUrls: ['./issue-creator.component.scss'],
})
export class IssueCreatorComponent implements AfterViewInit {
  @Input()
  form: IssueFormGroup = new IssueFormGroup();

  @ViewChild('headerPanel') headerPanel!: MatExpansionPanel;
  @ViewChild('elementsAccordion') elementsAccordion!: MatAccordion;
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
  @ViewChildren(MatExpansionPanel, { read: ElementRef }) panelsRef!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => this.headerPanel.open());
  }

  get controls(): FormGroup[] {
    return (this.form.get('body') as FormArray).controls as FormGroup[];
  }

  addMarkdown(): void {
    this.form.addMarkdown();
    this.updateVisibility();
  }

  addTextarea(): void {
    this.form.addTextarea();
    this.updateVisibility();
  }

  addInput(): void {
    this.form.addInput();
    this.updateVisibility();
  }

  addDropdown(): void {
    this.form.addDropdown();
    this.updateVisibility();
  }

  addCheckboxes(): void {
    this.form.addCheckboxes();
    this.updateVisibility();
  }

  addCheckboxOption(index: number): void {
    this.form.addCheckboxOption(index);
  }

  removeCheckboxOption(indexCheckBox: number, indexElement: number): void {
    this.form.removeCheckboxOption(indexCheckBox, indexElement);
  }

  deleteControl(index: number): void {
    this.form.deleteControl(index);
  }

  updateVisibility(): void {
    this.headerPanel.close();
    setTimeout(() => this.panels.last.open());
    setTimeout(
      () =>
        this.panelsRef.last.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start',
        }),
      500,
    );
  }

  closeAllPanels(): void {
    this.headerPanel.close();
    this.elementsAccordion.closeAll();
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
    RepositoryFinderModule,
    MatToolbarModule,
  ],
  exports: [IssueCreatorComponent],
})
export class IssueCreatorModule {}
