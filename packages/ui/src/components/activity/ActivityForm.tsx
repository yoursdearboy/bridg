import { Button, Stack } from "@mantine/core";
import type {
  ConceptDescriptor,
  DefinedObservationResult,
  PerformedObservationResult,
} from "api-ts";
import { useTranslation } from "react-i18next";
import { ObservationResult } from "./ObservationResult";

interface ActivityFormWrapperProps {
  spaceId: string;
  subjectId: string;
  performedResults: PerformedObservationResult[];
  definedResults: DefinedObservationResult[];
}

export const ActivityFormWrapper = ({
  spaceId,
  subjectId,
  performedResults,
  definedResults,
}: ActivityFormWrapperProps) => {
  return (
    <ActivityForm
      spaceId={spaceId}
      subjectId={subjectId}
      performedResults={performedResults}
      definedResults={definedResults}
    />
  );
};

interface ActivityFormProps {
  spaceId: string;
  subjectId: string;
  performedResults: PerformedObservationResult[];
  definedResults: DefinedObservationResult[];
}

const ActivityForm = ({
  performedResults,
  definedResults,
}: ActivityFormProps) => {
  const { t } = useTranslation();
  return (
    <Stack align="flex-start" w="100%">
      <Stack w="100%">
        {definedResults.map((d_result) => (
          <ObservationResultWrapper
            definedResult={d_result}
            performedResults={performedResults}
          />
        ))}
      </Stack>
      <Button type="submit">{t("submit")}</Button>
    </Stack>
  );
};

interface ObservationResultWrapperProps {
  definedResult: DefinedObservationResult;
  performedResults: PerformedObservationResult[];
}

function selectByKeyAndObjectMatch(
  arr: PerformedObservationResult[],
  matcher: ConceptDescriptor
): PerformedObservationResult | undefined {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (typeof matcher !== "object")
    throw new TypeError("matcher must be an object");

  const entries = Object.entries(matcher);
  if (entries.length === 0) return undefined;

  return arr.find((item) => {
    if (typeof item !== "object") return false;
    const nested = item.typeCode;
    if (nested == null || typeof nested !== "object") return false;

    if (matcher.code !== nested.code) return false;
    if (matcher.codeSystem !== nested.codeSystem) return false;
    if (matcher.displayName !== nested.displayName) return false;

    return true;
  });
}

const ObservationResultWrapper = ({
  definedResult,
  performedResults,
}: ObservationResultWrapperProps) => {
  const found = selectByKeyAndObjectMatch(
    performedResults,
    definedResult.typeCode!
  );
  if (found) {
    return <ObservationResult result={found} definedResult={definedResult} />;
  }
};
