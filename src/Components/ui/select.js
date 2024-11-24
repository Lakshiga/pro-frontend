import { useState } from "react";

// SelectTrigger Component: Handles the clickable element that triggers the dropdown
export const SelectTrigger = ({ children, onClick }) => {
  return (
    <div
      className="border border-gray-300 p-2 rounded-md cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// SelectValue Component: Displays the selected value
export const SelectValue = ({ value, placeholder }) => {
  return <div>{value || placeholder}</div>;
};

// SelectContent Component: Handles the dropdown content
export const SelectContent = ({ children, isOpen }) => {
  return (
    isOpen && (
      <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-2">
        {children}
      </div>
    )
  );
};

// Select Component: Wraps all other components and handles open/close state
export const Select = ({ onValueChange, value, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue value={value} placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent isOpen={isOpen}>{children}</SelectContent>
    </div>
  );
};

// SelectItem Component: Represents each option in the dropdown
export const SelectItem = ({ value, children, onClick }) => {
  return (
    <div
      className="p-2 hover:bg-gray-200 cursor-pointer"
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </div>
  );
};
