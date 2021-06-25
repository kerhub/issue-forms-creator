export interface InputElement {
  type: string;
  id: string;
  attributes: {
    label: string;
    description: string;
    placeholder: string;
    value: string;
  };
  validations: {
    required: boolean;
  };
}
