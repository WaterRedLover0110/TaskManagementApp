export interface LoginFormState {
  email: string;
  password: string;
}

export interface RegisterFormState {
	email: string;
	name: string;
	password: string;
	confirm: string;
}

export interface FormInputProps {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: any;
  errors: any;
}
