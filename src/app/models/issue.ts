import { IssueSection } from './issue-section';

export interface Issue {
  name: string;
  description: string;
  title?: string;
  labels?: string[];
  assignees?: string[];
  body: IssueSection[];
}
