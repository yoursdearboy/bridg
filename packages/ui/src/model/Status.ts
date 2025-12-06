import { Status } from "api-ts";

export const STATUSES = [
  Status.PotentialCandidate,
  Status.Candidate,
  Status.Screening,
  Status.Eligible,
  Status.Ineligible,
  Status.Withdrawn,
  Status.PendingOnStudy,
  Status.NotRegistered,
  Status.OnStudy,
  Status.OnStudyIntervention,
  Status.OnStudyObservation,
  Status.FollowUp,
  Status.OffStudy,
];

export const getStatusTransitions = (status: Status | null) => {
  switch (status) {
    case null:
      return [Status.PotentialCandidate];
    case Status.PotentialCandidate:
      return [Status.Candidate];
    case Status.Candidate:
      return [Status.Screening, Status.Eligible];
    case Status.Screening:
      return [Status.Eligible, Status.Ineligible, Status.Withdrawn];
    case Status.Eligible:
      return [Status.PendingOnStudy, Status.Withdrawn];
    case Status.PendingOnStudy:
      return [
        Status.Ineligible,
        Status.NotRegistered,
        Status.OnStudy,
        Status.OnStudyIntervention,
        Status.OnStudyObservation,
      ];
    case Status.OnStudy:
    case Status.OnStudyIntervention:
    case Status.OnStudyObservation:
      return [
        Status.OnStudy,
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
    case Status.PotentialCandidate:
      return "grey";
    case Status.Withdrawn:
    case Status.NotRegistered:
    case Status.Ineligible:
      return "red";
    case Status.OnStudy:
    case Status.OnStudyIntervention:
    case Status.OnStudyObservation:
      return "green";
    default:
      return "blue";
  }
};
