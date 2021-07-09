import { TestBed } from '@angular/core/testing';

import { YamlService } from './yaml.service';

describe('YamlService', () => {
  let service: YamlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YamlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove null properties from the headers', () => {
    // Given
    const issue = {
      name: 'Issue report',
      description: 'template for issue report',
      title: '',
    };

    // When
    const result = service.clearHeaders(issue);

    // Then
    const expected = {
      name: 'Issue report',
      description: 'template for issue report',
    };

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });

  it('should remove null properties with empty array from the headers', () => {
    // Given
    const issue = {
      name: 'Issue report',
      description: 'template for issue report',
      title: '',
      labels: [],
    };

    // When
    const result = service.clearHeaders(issue);

    // Then
    const expected = {
      name: 'Issue report',
      description: 'template for issue report',
    };

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });

  it('should remove empty objects', () => {
    // Given
    const section = {
      type: 'textarea',
      id: '',
      attributes: {
        label: 'Description',
        description: 'A clear and concise description of the problem',
        placeholder: '',
        value: '',
        render: '',
      },
      validations: {},
    };

    // When
    const result = service.removeEmptyObjects(section);

    // Then
    const expected = {
      type: 'textarea',
      attributes: {
        label: 'Description',
        description: 'A clear and concise description of the problem',
        placeholder: '',
        value: '',
        render: '',
      },
    };

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    expect(JSON.stringify(section)).not.toEqual(JSON.stringify(expected));
  });

  it('should clear the body with null properties and empty objects', () => {
    // Given
    const body = [
      {
        type: 'textarea',
        id: '',
        attributes: {
          label: 'Description',
          description: 'A clear and concise description of the problem',
          placeholder: '',
          value: '',
          render: '',
        },
        validations: {
          required: false,
        },
      },
    ];

    // When
    const result = service.clearBody(body);

    // Then
    const expected = [
      {
        type: 'textarea',
        attributes: {
          label: 'Description',
          description: 'A clear and concise description of the problem',
        },
      },
    ];

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    expect(JSON.stringify(body)).not.toEqual(JSON.stringify(expected));
  });
});
