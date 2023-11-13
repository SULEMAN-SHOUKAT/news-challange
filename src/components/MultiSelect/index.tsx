import { useEffect, useRef, useState, RefObject } from "react";

type InputProps = {
  title: string;
  selectedOptions: string[];
  options: string[];
  hideLabel?: boolean;
  onSelect: (options: string[]) => void;
};

const MultiSelect = ({
  title,
  hideLabel = false,
  selectedOptions,
  options,
  onSelect,
}: InputProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const divRef: RefObject<HTMLDivElement> = useRef(null);

  const handleOnChange = (option: string) => {
    if (selectedOptions?.length) {
      if (selectedOptions.includes(option)) {
        onSelect(selectedOptions.filter((opt) => opt !== option));
      } else {
        onSelect([...selectedOptions, option]);
      }
    } else {
      onSelect([option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const isOptionSelected = (option: string) =>
    selectedOptions && selectedOptions.includes(option);

  return (
    <div className="mb-2 relative block" ref={divRef}>
      {!hideLabel && (
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title}
        </label>
      )}
      <div
        className="bg-gray-50 border h-11 text-gray-900 flex  overflow-x-auto overflow-hidden xs-scroll-bar text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOptions &&
          selectedOptions.map((opt) => (
            <div
              key={opt}
              className=" bg-gray-500 rounded text-xs whitespace-nowrap mr-1 text-center text-white px-1 py-0"
            >
              {opt}
            </div>
          ))}
      </div>
      {showOptions && (
        <div className=" absolute z-40 w-full  cursor-pointer max-h-44 bg-gray-50 border text-gray-900 text-sm rounded-lg overflow-y-auto overflow-x-hidden xs-scroll-bar">
          {options.map((option) => (
            <div
              className={`p-2 border-b border-gray-400 ${
                isOptionSelected(option) ? "bg-gray-600 text-white" : ""
              }`}
              key={option}
              onClick={() => handleOnChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
