import React from "react";

const Header = ({ children, className }: any) => (
  <div className={`card-header ${className}`}>{children}</div>
);

const Body = ({ children, className }: any) => (
  <div className={`card-body ${className}`}>{children}</div>
);

function Card({ children, className }: any) {
  const array = React.Children.toArray(children) as JSX.Element[];
  const header = array.find((child) => child.type == Header);
  const body = array.find((child) => child.type == Body);

  return (
    <div className={`card ${className}`}>
      {header}
      {body}
    </div>
  );
}

Card.Header = Header;
Card.Body = Body;

export default Card;
