export default function Alert({ children, className, variant }) {
  return <div className={`alert alert-${variant} ${className}`}>{children}</div>;
}
