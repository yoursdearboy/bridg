import { Menu, type MenuItemProps } from "@mantine/core";
import { createLink } from "@tanstack/react-router";
import React from "react";

const MenuItemLink = createLink(
  React.forwardRef<HTMLDivElement, MenuItemProps>((props) => (
    <Menu.Item {...props} />
  ))
);

export default MenuItemLink;
