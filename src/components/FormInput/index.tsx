import { FormInputProps } from "../../types";

const FormInput = ({label, type, name, id, placeholder, value, handleChange, required, error=''}: FormInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {
          required && ' *'
        }
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder={placeholder}
				value={value}
				onChange={handleChange}
        required
      />
      <span className="text-red-800 dark:text-red-400 text-sm">{error}</span>
    </div>
  );
};

export default FormInput
