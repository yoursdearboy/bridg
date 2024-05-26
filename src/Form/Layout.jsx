import { forwardRef } from "react";

export const Col = ({ children, className }) => (
  <div className={className}>{children}</div>
);
export const Row = ({ children, className }) => (
  <div className={`row ${className}`}>{children}</div>
);

export const Label = ({ children, className, htmlFor }) => (
  <label htmlFor={htmlFor} className={`col-form-label ${className}`}>
    {children}
  </label>
);

export const TextInput = forwardRef(function TextInput(
  { className, ...props },
  ref
) {
  return (
    <input
      type="text"
      className={`form-control ${className}`}
      {...props}
      ref={ref}
    />
  );
});

export const Select = forwardRef(function Select(
  { className, options, ...props },
  ref
) {
  return (
    <select className={`form-select ${className}`} {...props} ref={ref}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
});

export const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
