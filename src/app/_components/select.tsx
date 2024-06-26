import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`border-r-8 border-transparent outline outline-1 outline-gray-700 px-3 py-2 rounded-md${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </select>
  );
}
