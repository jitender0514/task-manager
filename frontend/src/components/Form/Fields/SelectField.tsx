import React from "react";
import { FormFieldProps } from "../../../types/FormTypes";
import { useFormContext } from "react-hook-form";

const SelectField: React.FC<FormFieldProps> = ({
  value,
  label,
  name,
  options,
  error,
  valueAsNumber,
}) => {
  const { register } = useFormContext();
  return (
    <>
      {label && (
        <label
          className="block text-sm font-medium text-gray-900"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <select
        defaultValue={value}
        className={`select select-bordered w-full  focus:ring-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
          error
            ? "focus:ring-red-500 focus:border-red-50 bg-red-50 border-red-500 text-red-900 placeholder-red-700"
            : ""
        }`}
        {...register(name, { valueAsNumber })}
      >
        {options?.map((option, index) => (
          <option key={`${option.value}${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="error-message  mt-2 text-sm text-red-600 dark:text-red-500">
          {error.message}
        </p>
      )}
    </>
  );
};

export default SelectField;
