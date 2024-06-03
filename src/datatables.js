import React from "react";
import { createRoot } from "react-dom/client";

const render = {
  react: (Component) => (data, type, row, meta) => {
    const node = document.createElement("div");
    createRoot(node).render(React.createElement(Component, { data, type, row, meta }));
    return node;
  },
};

export default {
  render,
};
