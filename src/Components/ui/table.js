import React from 'react';

export const Table = ({ children }) => {
  return (
    <table className="min-w-full bg-white border">
      {children}
    </table>
  );
};

export const TableHeader = ({ children }) => {
  return <thead>{children}</thead>;
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }) => {
  return <tr className="border-t">{children}</tr>;
};

export const TableHead = ({ children }) => {
  return <th className="px-4 py-2 font-semibold text-left">{children}</th>;
};

export const TableCell = ({ children }) => {
  return <td className="px-4 py-2">{children}</td>;
};
