import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CheckboxSection } from '../models/checkbox-section';
import { TextareaSection } from '../models/textarea-section';
import { Issue } from '../models/issue';
import { IssueSectionEnum } from '../enums/issue-section.enum';
import { CheckboxesSection } from '../models/checkboxes-section';
import { DropdownSection } from '../models/dropdown-section';
import { MarkdownSection } from '../models/markdown-section';
import { InputSection } from '../models/input-section';
import { PresetEnum } from '../enums/preset.enum';
import { IssueSection } from '../models/issue-section';

export class IssueForm extends UntypedFormGroup {
  idRegex = /^[\w\d_-]+$/;

  constructor() {
    super({
      name: new UntypedFormControl('Bug report', Validators.required),
      description: new UntypedFormControl('Template for bug reports', Validators.required),
      title: new UntypedFormControl('[Bug]: '),
      body: new UntypedFormArray([]),
    });
    this.bodyControl.setValidators([
      this.validateIdUniqueness(),
      this.validateNotOnlyMarkdownSections(),
    ]);
  }

  get bodyControl(): UntypedFormArray {
    return this.get('body') as UntypedFormArray;
  }

  addLabels(data?: string[]): void {
    this.addControl('labels', new UntypedFormControl(data));
  }

  addAssignees(data?: string[]): void {
    this.addControl('assignees', new UntypedFormControl(data));
  }

  addMarkdown(data?: Partial<MarkdownSection>): void {
    this.bodyControl.push(this.createMarkdown(data));
  }

  addTextarea(data?: Partial<TextareaSection>): void {
    this.bodyControl.push(this.createTextarea(data));
  }

  addInput(data?: Partial<InputSection>): void {
    this.bodyControl.push(this.createInput(data));
  }

  addDropdown(data?: Partial<DropdownSection>): void {
    this.bodyControl.push(this.createDropdown(data));
  }

  addCheckboxes(data?: Partial<CheckboxesSection>): void {
    this.bodyControl.push(this.createCheckboxes(data));
  }

  addCheckboxOption(index: number): void {
    (this.bodyControl.at(index).get('attributes')?.get('options') as UntypedFormArray).push(
      this.createCheckbox(),
    );
  }

  removeCheckboxOption(indexCheckBox: number, indexSection: number): void {
    (
      this.bodyControl.at(indexSection).get('attributes')?.get('options') as UntypedFormArray
    ).removeAt(indexCheckBox);
  }

  deleteControl(index: number): void {
    this.bodyControl.removeAt(index);
  }

  private createMarkdown(data?: Partial<MarkdownSection>): UntypedFormGroup {
    return new UntypedFormGroup({
      type: new UntypedFormControl('markdown'),
      attributes: new UntypedFormGroup({
        value: new UntypedFormControl(data?.attributes?.value || null, Validators.required),
      }),
    });
  }

  private createTextarea(data?: Partial<TextareaSection>): UntypedFormGroup {
    return new UntypedFormGroup({
      type: new UntypedFormControl('textarea'),
      id: new UntypedFormControl(data?.id || null, Validators.pattern(this.idRegex)),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(data?.attributes?.label || null, Validators.required),
        description: new UntypedFormControl(data?.attributes?.description || ''),
        placeholder: new UntypedFormControl(data?.attributes?.placeholder || ''),
        value: new UntypedFormControl(data?.attributes?.value || null),
        render: new UntypedFormControl(data?.attributes?.render || null),
      }),
      validations: new UntypedFormGroup({
        required: new UntypedFormControl(data?.validations?.required || false),
      }),
    });
  }

  private createInput(data?: Partial<InputSection>): UntypedFormGroup {
    return new UntypedFormGroup({
      type: new UntypedFormControl('input'),
      id: new UntypedFormControl(data?.id || null, Validators.pattern(this.idRegex)),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(data?.attributes?.label || null, Validators.required),
        description: new UntypedFormControl(data?.attributes?.description || null),
        placeholder: new UntypedFormControl(data?.attributes?.placeholder || null),
        value: new UntypedFormControl(data?.attributes?.value || null),
      }),
      validations: new UntypedFormGroup({
        required: new UntypedFormControl(data?.validations?.required || false),
      }),
    });
  }

  private createDropdown(data?: Partial<DropdownSection>): UntypedFormGroup {
    return new UntypedFormGroup({
      type: new UntypedFormControl('dropdown'),
      id: new UntypedFormControl(data?.id || null, Validators.pattern(this.idRegex)),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(data?.attributes?.label || null, Validators.required),
        description: new UntypedFormControl(data?.attributes?.description || ''),
        multiple: new UntypedFormControl(data?.attributes?.multiple || false),
        options: new UntypedFormControl(data?.attributes?.options || [], [
          Validators.required,
          this.validateDropdownOptionsUniqueness(),
          this.validateDropdownNone(),
        ]),
      }),
      validations: new UntypedFormGroup({
        required: new UntypedFormControl(data?.validations?.required || false),
      }),
    });
  }

  private createCheckboxes(data?: Partial<CheckboxesSection>): UntypedFormGroup {
    return new UntypedFormGroup({
      type: new UntypedFormControl('checkboxes'),
      id: new UntypedFormControl(data?.id || null, Validators.pattern(this.idRegex)),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(data?.attributes?.label || null),
        description: new UntypedFormControl(data?.attributes?.description || null),
        options: new UntypedFormArray(
          (data?.attributes?.options.map(option =>
            this.createCheckbox(option),
          ) as AbstractControl[]) || [],
          [Validators.required, this.validateCheckboxUniqueness()],
        ),
      }),
    });
  }

  private createCheckbox(data?: Partial<CheckboxSection>): UntypedFormGroup {
    return new UntypedFormGroup({
      label: new UntypedFormControl(data?.label || null, Validators.required),
      required: new UntypedFormControl(data?.required || false),
    });
  }

  createPreset(preset: PresetEnum): void {
    this.resetForm();
    if (preset && preset === PresetEnum.BUG_REPORT) {
      this.createBugReportPreset();
    }

    if (preset && preset === PresetEnum.FEATURE_REQUEST) {
      this.createFeatureRequestPreset();
    }
  }

  private createBugReportPreset(): void {
    this.patchValue({
      name: 'Bug report',
      description: 'Template for bug reports',
      title: '[Bug]: ',
    });

    this.addLabels(['bug']);

    this.addTextarea({
      attributes: {
        label: 'Description',
        description: 'A clear and concise description of the problem',
        placeholder: '',
        value: '',
        render: '',
      },
      validations: {
        required: true,
      },
    });

    this.addTextarea({
      attributes: {
        label: 'Minimal Reproduction',
        description: 'provide steps to reproduce the problem',
        placeholder: '',
        value: '',
        render: '',
      },
    });

    this.addTextarea({
      attributes: {
        label: 'Exception or Error',
        description: 'provide error logs',
        placeholder: '',
        value: '',
        render: '',
      },
    });
  }

  private createFeatureRequestPreset(): void {
    this.patchValue({
      name: 'Feature Request',
      description: 'template for missing feature',
      title: '[Feature Request]: ',
    });

    this.addTextarea({
      attributes: {
        label: 'Description',
        description: 'A clear and concise description of the problem or missing capability',
        placeholder: '',
        value: '',
        render: '',
      },
      validations: {
        required: true,
      },
    });

    this.addTextarea({
      attributes: {
        label: "Describe the solution you'd like",
        description: 'If you have a solution in mind, please describe it.',
        placeholder: '',
        value: '',
        render: '',
      },
    });

    this.addTextarea({
      attributes: {
        label: "Describe alternatives you've considered",
        description: 'Have you considered any alternative solutions or workarounds?',
        placeholder: '',
        value: '',
        render: '',
      },
    });
  }

  populate(issue: Issue): void {
    this.resetForm();

    const { body, ...headers } = issue;
    this.patchValue(headers);

    body.forEach(section => {
      switch (section.type) {
        case IssueSectionEnum.TEXTAREA:
          this.addTextarea(section as Partial<TextareaSection>);
          break;
        case IssueSectionEnum.DROPDOWN:
          this.addDropdown(section as Partial<DropdownSection>);
          break;
        case IssueSectionEnum.CHECKBOXES:
          this.addCheckboxes(section as Partial<CheckboxesSection>);
          break;
        case IssueSectionEnum.INPUT:
          this.addInput(section as Partial<InputSection>);
          break;
        case IssueSectionEnum.MARKDOWN:
          this.addMarkdown(section as Partial<MarkdownSection>);
          break;
        default:
          return;
      }
    });
  }

  resetForm(): void {
    while (this.bodyControl.length !== 0) {
      this.bodyControl.removeAt(0);
    }
    this.reset();
  }

  validateIdUniqueness(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const formSections = formArray.value as Array<IssueSection>;
      let ids: Set<string> = new Set<string>();

      formSections.forEach(section => {
        if ('id' in section && section.id) {
          ids.add(section.id.trim());
        }
      });

      if (ids.size < formSections.filter(section => 'id' in section && section.id).length) {
        return {
          duplicateIds: {
            message: 'IDs must be unique',
          },
        };
      }

      return null;
    };
  }

  validateCheckboxUniqueness(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const options = formArray.value as Array<CheckboxSection>;
      let labels: Set<string> = new Set<string>();

      options.forEach(option => {
        if (option.label) {
          labels.add(option.label.trim());
        }
      });

      if (labels.size < options.filter(option => option.label).length) {
        return {
          duplicateLabels: {
            message: 'Options must be unique',
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

      options.forEach(option => {
        if (option) {
          labels.add(option.trim());
        }
      });

      if (labels.size < options.filter(option => option).length) {
        return {
          duplicateOptions: {
            message: 'Options must be unique',
          },
        };
      }

      return null;
    };
  }

  validateNotOnlyMarkdownSections(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const formSections = formArray.value as Array<any>;

      for (let i = 0; i < formSections.length; i++) {
        if (formSections[i].type !== 'markdown') {
          return null;
        }
      }

      return {
        onlyMarkdownSections: {
          message: 'Must contain at least one non-markdown field',
        },
      };
    };
  }

  validateDropdownNone(): ValidatorFn {
    return (formArray: AbstractControl) => {
      const options = formArray.value as Array<string>;

      const uppercasedOptions = options
        .filter(option => option)
        .map(option => option.toUpperCase().trim());

      if (uppercasedOptions.includes('NONE')) {
        return {
          noneExists: {
            message: "Must not include the reserved word, 'None'",
          },
        };
      }

      return null;
    };
  }
}
