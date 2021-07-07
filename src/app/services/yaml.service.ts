import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueForm } from '../models/issue-form';

const yaml = require('js-yaml');

@Injectable({
  providedIn: 'root',
})
export class YamlService {
  constructor() {}

  parseYamlFile(file: File): Observable<IssueForm> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.onload = event => {
        const parsedContent = yaml.load(event.target?.result, { schema: yaml.JSON_SCHEMA });
        observer.next(parsedContent);
        observer.complete();
      };

      reader.onerror = error => {
        observer.error(error);
      };
    });
  }

  parseYamlContent(content: any) {
    return yaml.load(content, { schema: yaml.JSON_SCHEMA });
  }

  async copyToClipboard(issueForm: IssueForm): Promise<void> {
    const formattedIssue = this.formatIssue(issueForm);

    const yamlIssue = yaml.dump(formattedIssue);
    await navigator.clipboard.writeText(yamlIssue);
  }

  private formatIssue(issueForm: IssueForm): IssueForm {
    const { body, ...headers } = issueForm;
    const bodyWithPromotion = [
      ...body,
      {
        type: 'markdown',
        attributes: {
          value:
            'This template was generated with [Issue Forms Creator](https://www.issue-forms-creator.app/)',
        },
      },
    ];

    // hack to move labels/assignees on top of the json file, as it's required for the yaml validation
    const issueWithPromotion = {
      ...headers,
      body: bodyWithPromotion,
    };

    const issueWithoutNullReferences = this.removeNullReferences(issueWithPromotion);
    const issueWithoutEmptyObjects = this.removeEmptyObjects(issueWithoutNullReferences);

    return issueWithoutEmptyObjects;
  }

  // @ts-ignore
  private removeNullReferences(object: any): any {
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

  private removeEmptyObjects(object: any): any {
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
}
