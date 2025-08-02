import { Menu, type MenuItemProps } from "@mantine/core";
import { createLink } from "@tanstack/react-router";
import React from "react";

const MenuItemLink = createLink(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  React.forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => (
    <Menu.Item {...props} />
  ))
);

export default MenuItemLink;
