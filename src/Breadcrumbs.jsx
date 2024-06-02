function Item({ active = false, children, className }) {
  return <li className={`breadcrumb-item ${active ? "active" : ""} ${className}`}>{children}</li>;
}

function Breadcrumbs({ children, className, divider = ">", style }) {
  return (
    <nav className={className} style={{ "--bs-breadcrumb-divider": `'${divider}'`, ...style }}>
      <ol className="breadcrumb my-auto">{children}</ol>
    </nav>
  );
}

Breadcrumbs.Item = Item;

export default Breadcrumbs;
