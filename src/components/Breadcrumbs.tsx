function Item({ active = false, children, className }: any) {
  return <li className={`breadcrumb-item ${active ? "active" : ""} ${className}`}>{children}</li>;
}

function Breadcrumbs({ children, className, divider = ">", style }: any) {
  return (
    <nav className={className} style={{ "--bs-breadcrumb-divider": `'${divider}'`, ...style }}>
      <ol className="breadcrumb my-auto">{children}</ol>
    </nav>
  );
}

Breadcrumbs.Item = Item;

export default Breadcrumbs;
