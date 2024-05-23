import React from "react";

const Left = ({ children }) => children;
const Center = ({ children }) => children;
const Right = ({ children }) => children;

function Toolbar({ children }) {
  const array = React.Children.toArray(children);
  const left = array.filter((child) => child.type == Left);
  const center = array.filter((child) => child.type == Center);
  const right = array.filter((child) => child.type == Right);

  return (
    <div className="d-flex my-2">
      <div className="pe-2">{left}</div>
      <div className="p-2">{center}</div>
      <div className="ms-auto ps-2">{right}</div>
    </div>
  );
}

Toolbar.Left = Left;
Toolbar.Center = Center;
Toolbar.Right = Right;

export default Toolbar;
