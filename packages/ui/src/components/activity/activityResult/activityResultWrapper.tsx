import type { DefinedObservationResult } from "api-ts";
import { Input } from "../fields/input";

interface ActivityResultWrapperProps {
  result: DefinedObservationResult;
}

export const ActivityResultWrapper = ({
  result,
}: ActivityResultWrapperProps) => {
  return (
    <Input
      label={result.typeCode?.displayName || "unamed field"}
      kind={result.valueType}
    />
  );
};
