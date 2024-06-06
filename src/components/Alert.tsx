export default function Alert({ children, className, variant }: any) {
  return <div className={`alert alert-${variant} ${className}`}>{children}</div>;
}
