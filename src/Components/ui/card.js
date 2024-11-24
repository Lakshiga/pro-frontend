// components/ui/Card.js
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className }) => {
    return (
      <div className={`p-4 border-b border-gray-200 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children }) => {
    return <div className="p-4">{children}</div>;
  };
  
  export const CardFooter = ({ children }) => {
    return <div className="p-4 border-t border-gray-200">{children}</div>;
  };
  
  export const CardTitle = ({ children }) => {
    return <h2 className="text-lg font-semibold">{children}</h2>;
  };
  
  export const CardDescription = ({ children }) => {
    return <p className="text-sm text-gray-500">{children}</p>;
  };
  