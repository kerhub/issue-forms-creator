import { IssueForm } from './issue.form';
import { UntypedFormArray, UntypedFormControl } from '@angular/forms';

describe('IssueForm', () => {
  let issueForm: IssueForm;

  beforeEach(() => (issueForm = new IssueForm()));

  it(`
    WHEN adding duplicate ids
    SHOULD return an duplicateIds error
  `, () => {
    // Given

    // When
    issueForm.addTextarea({ id: '123' });
    issueForm.addTextarea({ id: '123' });

    // Then
    expect(issueForm.validateIdUniqueness()(issueForm.bodyControl)?.duplicateIds).toBeDefined();
  });

  it(`
    WHEN adding duplicates ids with whitespaces
    SHOULD return an duplicateIds error
  `, () => {
    // Given

    // When
    issueForm.addTextarea({ id: '123' });
    issueForm.addTextarea({ id: ' 123' });

    // Then
    expect(issueForm.validateIdUniqueness()(issueForm.bodyControl)?.duplicateIds).toBeDefined();
  });

  it(`
    WHEN adding unique ids
    SHOULD not return an error
  `, () => {
    // Given

    // When
    issueForm.addTextarea({ id: '123' });
    issueForm.addTextarea({ id: '13' });

    // Then
    expect(issueForm.validateIdUniqueness()(issueForm.bodyControl)).toEqual(null);
  });

  it(`
    WHEN adding duplicate checkboxes labels
    SHOULD return a duplicateLabels error
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      attributes: {
        label: '',
        description: '',
        options: [
          {
            label: 'foo',
            required: true,
          },
          {
            label: 'foo',
            required: true,
          },
        ],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormArray;
    expect(issueForm.validateCheckboxUniqueness()(optionsControl)?.duplicateLabels).toBeDefined();
  });

  it(`
    WHEN adding unique checkboxes labels
    SHOULD not return an error
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      attributes: {
        label: '',
        description: '',
        options: [
          {
            label: 'foo',
            required: true,
          },
          {
            label: 'bar',
            required: true,
          },
        ],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormArray;
    expect(issueForm.validateCheckboxUniqueness()(optionsControl)).toEqual(null);
  });

  it(`
    WHEN adding unique checkboxes labels with whitespaces
    SHOULD return a duplicateLabels error
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      attributes: {
        label: '',
        description: '',
        options: [
          {
            label: 'foo',
            required: true,
          },
          {
            label: ' foo',
            required: true,
          },
        ],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormArray;
    expect(issueForm.validateCheckboxUniqueness()(optionsControl)?.duplicateLabels).toBeDefined();
  });

  it(`
    WHEN adding duplicate dropdown labels
    SHOULD throw a duplicateOptions error
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      attributes: {
        label: '',
        description: '',
        multiple: false,
        options: ['Angular', 'Angular'],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(
      issueForm.validateDropdownOptionsUniqueness()(optionsControl)?.duplicateOptions,
    ).toBeDefined();
  });

  it(`
    WHEN adding unique dropdown labels
    SHOULD not return a error
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      attributes: {
        label: '',
        description: '',
        multiple: false,
        options: ['React', 'Angular'],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(issueForm.validateDropdownOptionsUniqueness()(optionsControl)).toEqual(null);
  });

  it(`
    WHEN adding duplicate dropdown labels with whitespaces
    SHOULD throw a duplicateOptions error
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      attributes: {
        label: '',
        description: '',
        multiple: false,
        options: [' Angular ', 'Angular'],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(
      issueForm.validateDropdownOptionsUniqueness()(optionsControl)?.duplicateOptions,
    ).toBeDefined();
  });

  it(`
    WHEN including only markdown sections
    SHOULD throw a onlyMarkdownSections error
  `, () => {
    // Given

    // When
    issueForm.addMarkdown({
      attributes: {
        value: 'foo',
      },
    });
    issueForm.addMarkdown({
      attributes: {
        value: 'foo',
      },
    });

    // Then
    expect(
      issueForm.validateNotOnlyMarkdownSections()(issueForm.bodyControl)?.onlyMarkdownSections,
    ).toBeDefined();
    expect(issueForm.valid).toEqual(false);
  });

  it(`
    WHEN including markdown and other sections
    SHOULD not return an error
  `, () => {
    // Given

    // When
    issueForm.addMarkdown({
      attributes: {
        value: 'foo',
      },
    });
    issueForm.addInput({
      attributes: {
        label: 'foo',
        description: '',
        placeholder: '',
        value: '',
      },
    });

    // Then
    expect(issueForm.validateNotOnlyMarkdownSections()(issueForm.bodyControl)).toEqual(null);
    expect(issueForm.valid).toEqual(true);
  });

  it(`
    WHEN including 'None' option
    SHOULD throw a noneExists error
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      attributes: {
        label: '',
        description: '',
        multiple: false,
        options: ['None', 'Angular'],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(issueForm.validateDropdownNone()(optionsControl)?.noneExists).toBeDefined();
  });

  it(`
    WHEN with no 'None' option
    SHOULD not return an error
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      attributes: {
        label: '',
        description: '',
        multiple: false,
        options: ['React', 'Angular'],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      ?.get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(issueForm.validateDropdownNone()(optionsControl)).toEqual(null);
  });

  it(`
    WHEN a checkbox section is missing a label
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      attributes: {
        label: '',
        description: '',
        options: [
          {
            label: '',
            required: true,
          },
        ],
      },
    });

    // Then
    const checkboxControl = (
      issueForm.bodyControl.at(0)?.get('attributes')?.get('options') as UntypedFormArray
    ).at(0);
    expect(checkboxControl.valid).toEqual(false);
  });

  it(`
    WHEN checkbox section include a label
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      attributes: {
        label: '',
        description: '',
        options: [
          {
            label: 'foo',
            required: true,
          },
        ],
      },
    });

    // Then
    const checkboxControl = (
      issueForm.bodyControl.at(0)?.get('attributes')?.get('options') as UntypedFormArray
    ).at(0);
    expect(checkboxControl.valid).toEqual(true);
  });

  it(`
    WHEN markdown section is missing a value
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addMarkdown({
      attributes: {
        value: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
  });

  it(`
    WHEN markdown section includes a value
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addMarkdown({
      attributes: {
        value: 'foo',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN textarea section is missing a label
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addTextarea({
      id: '123',
      attributes: {
        label: '',
        description: '',
        placeholder: '',
        value: '',
        render: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
  });

  it(`
    WHEN textarea section includes a label
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addTextarea({
      id: '123',
      attributes: {
        label: 'foo',
        description: '',
        placeholder: '',
        value: '',
        render: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN textarea section includes an id with special character (except - and _ )
    SHOULD return invalid textarea section
  `, () => {
    // Given

    // When
    issueForm.addTextarea({
      id: '12*`3',
      attributes: {
        label: 'foo',
        description: '',
        placeholder: '',
        value: '',
        render: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
  });

  it(`
    WHEN textarea section includes an id without special character (except - and _ )
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addTextarea({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        placeholder: '',
        value: '',
        render: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN input section doesn't include a label
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addInput({
      id: '123',
      attributes: {
        label: '',
        description: '',
        placeholder: '',
        value: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).invalid).toEqual(true);
  });

  it(`
    WHEN  input section includes a label
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addInput({
      id: '123',
      attributes: {
        label: 'foo',
        description: '',
        placeholder: '',
        value: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN input section includes an id with special character (except - and _ )
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addInput({
      id: '12*`3',
      attributes: {
        label: 'foo',
        description: '',
        placeholder: '',
        value: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).invalid).toEqual(true);
  });

  it(`
    WHEN input section includes an id without special character (except - and _ )
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addInput({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        placeholder: '',
        value: '',
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN dropdown section doesn't include a label
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      id: '123',
      attributes: {
        label: '',
        description: '',
        multiple: false,
        options: ['Angular'],
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).invalid).toEqual(true);
  });

  it(`
    WHEN dropdown section includes a label
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      id: '123',
      attributes: {
        label: 'foo',
        description: '',
        multiple: false,
        options: ['Angular'],
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN dropdown section includes an id with special character (except - and _ )
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      id: '12*`3',
      attributes: {
        label: 'foo',
        description: '',
        multiple: false,
        options: ['Angular'],
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
  });

  it(`
    WHEN dropdown section includes an id without special character (except - and _ )
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        multiple: false,
        options: ['Angular'],
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN dropdown section doesn't include options
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        multiple: false,
        options: [],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      .get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
    expect(optionsControl.hasError('required')).toEqual(true);
  });

  it(`
    WHEN dropdown section includes duplicates id
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        multiple: false,
        options: ['Angular', 'Angular'],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      .get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
    expect(optionsControl.hasError('duplicateOptions')).toEqual(true);
  });

  it(`
    WHEN dropdown section includes 'None' option
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addDropdown({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        multiple: false,
        options: ['None', 'Angular'],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      .get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
    expect(optionsControl.hasError('noneExists')).toEqual(true);
  });

  it(`
    WHEN checkboxes section includes an id with special character (except - and _ )
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      id: '12*`3',
      attributes: {
        label: 'foo',
        description: '',
        options: [
          {
            label: 'do it',
            required: false,
          },
        ],
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
  });

  it(`
    WHEN checkboxes section includes an id without special character (except - and _ )
    SHOULD return valid form
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        options: [
          {
            label: 'do it',
            required: false,
          },
        ],
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(true);
  });

  it(`
    WHEN checkboxes section doesn't include options
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        options: [],
      },
    });

    // Then
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
  });

  it(`
    WHEN checkboxes section includes duplicate labels
    SHOULD return invalid form
  `, () => {
    // Given

    // When
    issueForm.addCheckboxes({
      id: 'foo-bar',
      attributes: {
        label: 'foo',
        description: '',
        options: [
          {
            label: 'do it',
            required: false,
          },
          {
            label: 'do it',
            required: false,
          },
        ],
      },
    });

    // Then
    const optionsControl = issueForm.bodyControl
      .at(0)
      .get('attributes')
      ?.get('options') as UntypedFormControl;
    expect(issueForm.bodyControl.at(0).valid).toEqual(false);
    expect(optionsControl.hasError('duplicateLabels')).toEqual(true);
  });

  test.todo('addCheckboxOption');
  test.todo('removeCheckboxOption');
  test.todo('createPreset');
  test.todo('createBugReportPreset');
  test.todo('createFeatureRequestPreset');
  test.todo('populate');
  test.todo('resetForm');
});
