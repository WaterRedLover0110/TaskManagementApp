import { FormTextAreaProps } from "../../types";

const FormTextArea = ({
  name,
  placeholder,
  value,
  handleChange,
  label,
  id,
  rows,
  required
}: FormTextAreaProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {
          required && '*'
        }
      </label>
      <textarea
        name={name}
        id={id}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder={placeholder}
        value={value}
				rows={rows}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormTextArea;
