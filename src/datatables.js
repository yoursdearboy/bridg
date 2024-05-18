import React from "react";
import { createRoot } from "react-dom/client";

export const reactRenderer = (Component) => (data, type, row, meta) => {
  const node = document.createElement("div");
  createRoot(node).render(
    React.createElement(Component, { data, type, row, meta })
  );
  return node;
};
