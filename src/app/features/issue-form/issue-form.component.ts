import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IssueForm } from '../../forms/issue.form';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { YamlService } from '../../services/yaml.service';
import { Issue } from '../../models/issue';
import { PresetEnum } from '../../enums/preset.enum';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent {
  form: IssueForm = new IssueForm();
  clipboardSuccess: boolean = false;
  clipboardError: boolean = false;
  scrollableItem!: { position: number };
  isSelectionMode: boolean = false;
  copyActivated: boolean = false;

  constructor(
    private readonly meta: Meta,
    private readonly yamlService: YamlService,
    private readonly formService: FormService,
  ) {
    meta.addTag({ name: 'description', content: 'unofficial Github Issue Forms generator' });
  }

  get controls(): UntypedFormGroup[] {
    return (this.form.get('body') as UntypedFormArray).controls as UntypedFormGroup[];
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.moveItemInFormArray(
      this.form.get('body') as UntypedFormArray,
      event.previousIndex,
      event.currentIndex,
    );
  }

  moveItemInFormArray(formArray: UntypedFormArray, fromIndex: number, toIndex: number): void {
    const dir = toIndex > fromIndex ? 1 : -1;

    const item = formArray.at(fromIndex);
    for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
      const current = formArray.at(i + dir);
      formArray.setControl(i, current);
    }
    formArray.setControl(toIndex, item);
  }

  async copyToClipboard(): Promise<void> {
    this.copyActivated = true;
    if (this.form.invalid) {
      this.clipboardError = true;
      setTimeout(() => (this.clipboardError = false), 2000);
      return;
    }

    await this.yamlService.copyToClipboard(this.form.value);

    this.clipboardSuccess = true;
    setTimeout(() => (this.clipboardSuccess = false), 1000);
  }

  createNew(): void {
    this.form.resetForm();
    this.isSelectionMode = false;
  }

  createWithPreset(preset: PresetEnum): void {
    this.form.createPreset(preset);
    this.formService.populate();
    this.isSelectionMode = false;
  }

  loadYamlFile(issue: Issue): void {
    this.form.populate(issue);
    this.isSelectionMode = false;
  }

  scrollToError(index: number): void {
    this.scrollableItem = Object.assign({ position: index });
  }

  switchSelectionMode(): void {
    this.isSelectionMode = !this.isSelectionMode;
  }
}
