import { Anchor, type AnchorProps } from "@mantine/core";
import { createLink } from "@tanstack/react-router";
import React from "react";

const AnchorLink = createLink(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  React.forwardRef<HTMLDivElement, AnchorProps>((props, ref) => (
    <Anchor {...props} />
  ))
);

export default AnchorLink;
