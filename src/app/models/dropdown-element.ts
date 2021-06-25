export interface DropdownElement {
  type: string;
  id: string;
  attributes: {
    label: string;
    description: string;
    options: string[];
    multiple: boolean;
  };
  validations: {
    required: boolean;
  };
}
