import { CheckboxElement } from './checkbox-element';

export interface CheckboxesElement {
  type: string;
  id: string;
  attributes: {
    label: string;
    description: string;
    options: CheckboxElement[];
  };
}
