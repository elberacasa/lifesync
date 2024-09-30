import React from 'react';

export function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={`form-checkbox h-5 w-5 text-blue-600 ${className}`}
      {...props}
    />
  );
}