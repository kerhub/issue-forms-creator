import { CheckboxSection } from './checkbox-section';

export interface CheckboxesSection {
  type: string;
  id: string;
  attributes: {
    label: string;
    description: string;
    options: CheckboxSection[];
  };
}
