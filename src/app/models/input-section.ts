export interface InputSection {
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
