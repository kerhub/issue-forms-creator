import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue';
import { IssueSection } from '../models/issue-section';

const yaml = require('js-yaml');

@Injectable({
  providedIn: 'root',
})
export class YamlService {
  constructor() {}

  parseYamlFile(file: File): Observable<Issue> {
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

  async copyToClipboard(issueForm: Issue): Promise<void> {
    const formattedIssue = this.formatIssue(issueForm);

    const yamlIssue = yaml.dump(formattedIssue);
    await navigator.clipboard.writeText(yamlIssue);
  }

  formatIssue(issueForm: Issue): Issue {
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
      ...this.clearHeaders(headers),
      body: this.clearBody(bodyWithPromotion),
    };

    return issueWithPromotion;
  }

  clearHeaders(form: Omit<Issue, 'body'>): Omit<Issue, 'body'> {
    return this.removeNullProperties(
      form,
      ([_, v]) => (Array.isArray(v) && v.length > 0) || (v && !Array.isArray(v)),
    );
  }

  clearBody(body: IssueSection[]): IssueSection[] {
    return body
      .map(section => this.removeNullProperties(section, ([_, v]) => v))
      .map(section => this.removeEmptyObjects(section));
  }

  removeNullProperties(
    object: any,
    callback: ([key, value]: [key: string, value: any]) => boolean,
  ): any {
    return Object.entries(object)
      .filter(callback)
      .reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: v === Object(v) && !Array.isArray(v) ? this.removeNullProperties(v, callback) : v,
        }),
        {},
      );
  }

  removeEmptyObjects(object: any): any {
    return Object.entries(object)
      .filter(([_, v]) => !(Object(v) && Object.keys(v as Object).length === 0))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }
}
