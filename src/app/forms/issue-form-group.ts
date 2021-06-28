import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CheckboxElement } from '../models/checkbox-element';

export class IssueFormGroup extends FormGroup {
  constructor() {
    super({
      name: new FormControl('Bug report', Validators.required),
      description: new FormControl('template for bug reports', Validators.required),
      title: new FormControl('[Bug]: ', Validators.required),
      body: new FormArray([]),
    });
    this.get('body')?.setValidators([
      this.validateIdUniqueness(),
      this.validateNotOnlyMarkdownElements(),
    ]);
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
        options: new FormControl(
          [],
          [
            Validators.required,
            this.validateDropdownOptionsUniqueness(),
            this.validateDropdownNone(),
          ],
        ),
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
        options: new FormArray(
          [this.createCheckbox()],
          [Validators.required, this.validateCheckboxUniqueness()],
        ),
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

  validateIdUniqueness(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const formElements = formArray.value as Array<any>;
      let ids: Set<string> = new Set<string>();

      formElements.forEach(element => {
        if (element.id) {
          ids.add(element.id);
        }
      });

      if (ids.size < formElements.filter(element => element.id).length) {
        return {
          duplicateIds: {
            message: 'Ids must be unique',
          },
        };
      }

      return null;
    };
  }

  validateCheckboxUniqueness(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const options = formArray.value as Array<CheckboxElement>;
      let labels: Set<string> = new Set<string>();

      options.forEach(element => {
        if (element.label) {
          labels.add(element.label);
        }
      });

      if (labels.size < options.filter(element => element.label).length) {
        return {
          duplicateLabels: {
            message: 'options must be unique',
          },
        };
      }

      return null;
    };
  }

  validateDropdownOptionsUniqueness(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const options = formArray.value as Array<string>;
      let labels: Set<string> = new Set<string>();

      options.forEach(element => {
        if (element) {
          labels.add(element);
        }
      });

      if (labels.size < options.filter(element => element).length) {
        return {
          duplicateOptions: {
            message: 'options must be unique',
          },
        };
      }

      return null;
    };
  }

  validateNotOnlyMarkdownElements(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const formElements = formArray.value as Array<any>;

      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== 'markdown') {
          return null;
        }
      }

      return {
        onlyMarkdownElements: {
          message: 'must contain at least one non-markdown field',
        },
      };
    };
  }

  validateDropdownNone(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const options = formArray.value as Array<string>;

      const uppercasedOptions = options
        .filter(option => option)
        .map(option => option.toUpperCase());

      if (uppercasedOptions.includes('NONE')) {
        return {
          noneExists: {
            message: "must not include the reserved word, 'None'",
          },
        };
      }

      return null;
    };
  }
}
