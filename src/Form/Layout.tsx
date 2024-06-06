import { forwardRef } from "react";

export const Col = ({ children, className }: any) => <div className={className}>{children}</div>;

export const Row = ({ children, className }: any) => (
  <div className={`row ${className}`}>{children}</div>
);

export const Label = ({ children, className, col, htmlFor }: any) => {
  const baseClassName = col ? "col-form-label" : "form-label";
  return (
    <label htmlFor={htmlFor} className={`${baseClassName} ${className}`}>
      {children}
    </label>
  );
};

export const TextInput = forwardRef<HTMLInputElement, any>(function TextInput(
  { className, ...props },
  ref
) {
  return <input type="text" className={`form-control ${className}`} {...props} ref={ref} />;
});

export const Select = forwardRef<HTMLSelectElement, any>(function Select(
  { className, options, ...props },
  ref
) {
  if (options === null) {
    options = null;
  } else if (Array.isArray(options)) {
    options = options.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
  } else if (typeof options === "object") {
    options = Object.keys(options).map((key) => (
      <option key={key} value={key}>
        {options[key]}
      </option>
    ));
  }

  return (
    <select className={`form-select ${className}`} {...props} ref={ref}>
      {options}
    </select>
  );
});

export const Checkbox = forwardRef<HTMLInputElement, any>(function Checkbox(
  { children, className, id, ...props },
  ref
) {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className={`form-check-input ${className}`}
        id={id}
        {...props}
        ref={ref}
      />
      <label className="form-check-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
});

export const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
