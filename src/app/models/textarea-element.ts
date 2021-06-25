export interface TextareaElement {
  type: string;
  id: string;
  attributes: {
    label: string;
    description: string;
    placeholder: string;
    value: string;
    render: string;
  };
  validations: {
    required: boolean;
  };
}
