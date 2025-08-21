import { Button, type ButtonProps } from "@mantine/core";
import { createLink } from "@tanstack/react-router";
import React from "react";

const ButtonLink = createLink(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  React.forwardRef<HTMLDivElement, ButtonProps>((props, ref) => (
    <Button {...props} />
  ))
);

export default ButtonLink;
