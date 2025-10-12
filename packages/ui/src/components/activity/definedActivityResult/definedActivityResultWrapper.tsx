import type { DefinedObservationResult } from "api-ts";
import { InputWrapper } from "../activityFields/inputWrapper";
interface DefinedActivityResultWrapperProps {
  result: DefinedObservationResult;
}

export const DefinedActivityResultWrapper = ({
  result,
}: DefinedActivityResultWrapperProps) => {
  return <InputWrapper label={result.typeCode?.displayName} kind={"text"} />;
};
