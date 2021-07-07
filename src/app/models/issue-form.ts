import { IssueSection } from './issue-section';

export interface IssueForm {
  name: string;
  description: string;
  title: string;
  labels?: string[];
  assignees?: string[];
  body: IssueSection[];
}
