import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IssueFormGroup } from '../../forms/issue-form-group';
import { FormArray, FormGroup } from '@angular/forms';

const yaml = require('js-yaml');

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
})
export class IssueFormComponent {
  form: IssueFormGroup = new IssueFormGroup();
  clipboardSuccess: boolean = false;
  clipboardError: boolean = false;
  scrollableItem!: { position: number };

  get controls(): FormGroup[] {
    return (this.form.get('body') as FormArray).controls as FormGroup[];
  }

  resetIssue(): void {
    this.form = new IssueFormGroup();
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.moveItemInFormArray(
      this.form.get('body') as FormArray,
      event.previousIndex,
      event.currentIndex,
    );
  }

  moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const dir = toIndex > fromIndex ? 1 : -1;

    const item = formArray.at(fromIndex);
    for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
      const current = formArray.at(i + dir);
      formArray.setControl(i, current);
    }
    formArray.setControl(toIndex, item);
  }

  async copyToClipboard(): Promise<void> {
    this.clipboardSuccess = false;
    this.clipboardError = false;

    if (this.form.invalid) {
      this.clipboardError = true;
      setTimeout(() => (this.clipboardError = false), 2000);
      return;
    }

    const formattedIssue = this.formatIssue();

    const yamlIssue = yaml.dump(formattedIssue);
    await navigator.clipboard.writeText(yamlIssue);

    this.clipboardSuccess = true;
    setTimeout(() => (this.clipboardSuccess = false), 1000);
  }

  formatIssue(): any {
    const bodyWithPromotion = [
      ...this.form.value.body,
      {
        type: 'markdown',
        attributes: {
          value:
            'This template was generated with [Issue Forms Creator](https://www.issue-forms-creator.app/)',
        },
      },
    ];

    const issueWithPromotion = {
      ...this.form.value,
      body: bodyWithPromotion,
    };

    const issueWithoutNullReferences = this.removeNullReferences(issueWithPromotion);
    const issueWithoutEmptyObjects = this.removeEmptyObjects(issueWithoutNullReferences);

    return issueWithoutEmptyObjects;
  }

  // @ts-ignore
  removeNullReferences(object: any): any {
    for (let key in object) {
      if (!object[key]) {
        delete object[key];
      }

      if (typeof object[key] === 'object') {
        this.removeNullReferences(object[key]);
      }
    }

    return object;
  }

  removeEmptyObjects(object: any): any {
    for (let key in object) {
      if (typeof object[key] === 'object' && Object.keys(object[key]).length === 0) {
        delete object[key];
        this.removeNullReferences(object[key]);
      }
      if (typeof object[key] === 'object' && Object.keys(object[key]).length !== 0) {
        this.removeEmptyObjects(object[key]);
      }
    }

    return object;
  }

  scrollToError(index: number): void {
    this.scrollableItem = Object.assign({ position: index });
  }
}
