import React from "react";

const Left = ({ children }) => <div className="pe-4">{children}</div>;
const Center = ({ children }) => <div className="flex-grow-1">{children}</div>;
const Right = ({ children }) => <div className="ps-4">{children}</div>;

function Toolbar({ children, className }) {
  const array = React.Children.toArray(children);
  const left = array.find((child) => child.type == Left);
  const center = array.find((child) => child.type == Center);
  const right = array.find((child) => child.type == Right);

  return (
    <div className={`d-flex ${className}`}>
      {left}
      {center}
      {right}
    </div>
  );
}

Toolbar.Left = Left;
Toolbar.Center = Center;
Toolbar.Right = Right;

export default Toolbar;
