import { Status } from "api-ts";

export const STATUSES = [
  Status.Candidate,
  Status.Screening,
  Status.Eligible,
  Status.Ineligible,
  Status.Withdrawn,
  Status.OnStudyIntervention,
  Status.OnStudyObservation,
  Status.FollowUp,
  Status.OffStudy,
];

export const getStatusTransitions = (status: Status | null) => {
  switch (status) {
    case null:
      return [Status.Candidate];
    case Status.Candidate:
      return [Status.Screening, Status.Eligible];
    case Status.Screening:
      return [Status.Eligible, Status.Ineligible, Status.Withdrawn];
    case Status.Eligible:
      return [
        Status.Ineligible,
        Status.OnStudyIntervention,
        Status.OnStudyObservation,
        Status.Withdrawn,
      ];
    case Status.OnStudyIntervention:
    case Status.OnStudyObservation:
      return [
        Status.OnStudyIntervention,
        Status.OnStudyObservation,
        Status.FollowUp,
        Status.OffStudy,
      ];
    case Status.FollowUp:
      return [Status.OffStudy];
    default:
      return [];
  }
};

export const getStatusColor = (status: Status | null): string => {
  switch (status) {
    case Status.Candidate:
    case Status.OffStudy:
      return "grey";
    case Status.Withdrawn:
    case Status.Ineligible:
      return "red";
    case Status.OnStudyIntervention:
    case Status.OnStudyObservation:
      return "green";
    default:
      return "blue";
  }
};
