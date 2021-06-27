import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export class IssueFormGroup extends FormGroup {
  constructor() {
    super({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      body: new FormArray([]),
    });
  }

  addLabels(): void {
    this.addControl('labels', new FormControl());
  }

  addAssignees(): void {
    this.addControl('assignees', new FormControl());
  }

  addMarkdown(): void {
    (this.get('body') as FormArray).push(this.createMarkdown());
  }

  addTextarea(): void {
    (this.get('body') as FormArray).push(this.createTextarea());
  }

  addInput(): void {
    (this.get('body') as FormArray).push(this.createInput());
  }

  addDropdown(): void {
    (this.get('body') as FormArray).push(this.createDropdown());
  }

  addCheckboxes(): void {
    (this.get('body') as FormArray).push(this.createCheckboxes());
  }

  addCheckboxOption(index: number): void {
    ((this.get('body') as FormArray).at(index).get('attributes')?.get('options') as FormArray).push(
      this.createCheckbox(),
    );
  }

  removeCheckboxOption(indexCheckBox: number, indexElement: number): void {
    (
      (this.get('body') as FormArray)
        .at(indexElement)
        .get('attributes')
        ?.get('options') as FormArray
    ).removeAt(indexCheckBox);
  }

  deleteControl(index: number): void {
    (this.get('body') as FormArray).removeAt(index);
  }

  private createMarkdown(): FormGroup {
    return new FormGroup({
      type: new FormControl('markdown'),
      attributes: new FormGroup({
        value: new FormControl(null, Validators.required),
      }),
    });
  }

  private createTextarea(): FormGroup {
    return new FormGroup({
      type: new FormControl('textarea'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(''),
        placeholder: new FormControl(''),
        value: new FormControl(null),
        render: new FormControl(null),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    });
  }

  private createInput(): FormGroup {
    return new FormGroup({
      type: new FormControl('input'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(null),
        placeholder: new FormControl(null),
        value: new FormControl(null),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    });
  }

  private createDropdown(): FormGroup {
    return new FormGroup({
      type: new FormControl('dropdown'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(''),
        multiple: new FormControl(false),
        options: new FormControl(null, Validators.required),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    });
  }

  private createCheckboxes(): FormGroup {
    return new FormGroup({
      type: new FormControl('checkboxes'),
      id: new FormControl(),
      attributes: new FormGroup({
        label: new FormControl(null),
        description: new FormControl(),
        options: new FormArray([this.createCheckbox()], Validators.required),
      }),
    });
  }

  private createCheckbox(): FormGroup {
    return new FormGroup({
      label: new FormControl(null, Validators.required),
      validations: new FormGroup({
        required: new FormControl(),
      }),
    });
  }
}
