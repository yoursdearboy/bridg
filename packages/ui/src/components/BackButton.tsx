import { Button, type ButtonProps } from "@mantine/core";
import { useRouter } from "@tanstack/react-router";
import React from "react";

const BackButton = React.forwardRef<HTMLDivElement, ButtonProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (props, ref) => {
    const router = useRouter();
    return <Button onClick={() => router.history.back()} {...props} />;
  }
);

export default BackButton;
