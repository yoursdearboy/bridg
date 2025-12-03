import { type DefinedActivityUnion, type PerformedActivityUnion } from "api-ts";
import { ActivityForm } from "./ActivityForm";

interface ActivityFormWrapperProps {
  definedActivity: DefinedActivityUnion;
  performedActivity: PerformedActivityUnion;
  onChange: (activity: PerformedActivityUnion) => void;
}

export const ActivityFormWrapper = ({
  definedActivity,
  performedActivity,
  onChange,
}: ActivityFormWrapperProps) => (
  <ActivityForm
    definedActivity={definedActivity}
    performedActivity={performedActivity}
    onChange={onChange}
  />
);
