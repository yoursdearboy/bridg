import { Button, type ButtonProps } from "@mantine/core";
import { createLink } from "@tanstack/react-router";
import React from "react";

const ButtonLink = createLink(
  React.forwardRef<HTMLDivElement, ButtonProps>((props) => (
    <Button {...props} />
  ))
);

export default ButtonLink;
