// components/ui/Input.js
export const Input = ({ id, name, placeholder, type = "text", value, onChange, required }) => {
    return (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"
      />
    );
  };
  