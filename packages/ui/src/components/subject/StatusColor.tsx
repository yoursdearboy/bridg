import { Status } from "api-ts";

const GREEN = "green";
const RED = "red";
const BLUE = "blue";

export const statusColor = (status: Status | null): string => {
  switch (status) {
    case Status.Withdrawn:
    case Status.NotRegistered:
    case Status.Ineligible:
      return RED;
    case Status.OnStudy:
    case Status.OnStudyIntervention:
    case Status.OnStudyObservation:
      return GREEN;
    default:
      return BLUE;
  }
};
