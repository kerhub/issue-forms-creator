import { CheckboxesSection } from './checkboxes-section';
import { DropdownSection } from './dropdown-section';
import { InputSection } from './input-section';
import { MarkdownSection } from './markdown-section';
import { TextareaSection } from './textarea-section';

export type IssueSection =
  | CheckboxesSection
  | DropdownSection
  | InputSection
  | MarkdownSection
  | TextareaSection;
