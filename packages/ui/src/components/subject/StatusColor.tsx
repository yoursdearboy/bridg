import { Status } from "api-ts";

const GREEN = "green";
const RED = "red";
const LIME = "lime";
const BLUE = "blue";

export const statusColor = (status: Status | null): string => {
  switch (status) {
    case Status.Withdrawn:
    case Status.NotRegistered:
    case Status.Ineligible:
      return RED;
    case Status.OnStudy:
      return GREEN;
    case Status.FollowUp:
      return LIME;
    default:
      return BLUE;
  }
};
