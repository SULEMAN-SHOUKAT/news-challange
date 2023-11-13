import { ChangeEvent } from "react";

type InputProps = {
  id: string;
  title: string;
  value: string;
  type: string;
  hideLabel?: boolean;
  onChange: (value: string) => void;
};

const Input = ({
  id,
  title,
  hideLabel = false,
  value,
  type,
  onChange,
}: InputProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-2">
      {!hideLabel && (
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={title}
        className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Input;
