import { describe, expect, it, vi } from "vitest";
import api from "@/api";
import { renderComponentInRoute } from "@/test-utils";
import { PersonTimelineCard } from "./PersonTimeline";

describe("PersonTimelineCard", () => {
  it("matches snapshot", async () => {
    const personId = "1944c046-95b3-4cb4-82e2-c789950e29fc";
    const spaceId = "ce946229-9746-46cd-8dd3-b27a2fbfd48a";
    const personSpy = vi.spyOn(api, "listPersonSubject").mockResolvedValue([
      {
        id: personId,
        status: "eligible",
        statusDate: new Date("2024-11-06T12:00:00"),
        assignedStudySiteProtocolVersionRelationship: [
          {
            id: "6a8e6e2b-9537-408f-bd92-a5b83ad2e750",
            executingStudySite: {
              id: "7cbc3369-7d06-4742-b6f1-b83f62d72f1e",
              label: "DGOI",
            },
            executedStudyProtocolVersion: {
              id: spaceId,
              label: "AML-MRD-2018",
            },
          },
        ],
      },
    ]);
    const subjectsSpy = vi
      .spyOn(api, "listSpaceSubjectPerformedActivity")
      .mockResolvedValue([
        {
          id: "ce3dd821-3a1b-41dd-a366-292c8c163a58",
          comment: null,
          dateRange: {
            dataTypeName: "IVL[TS]",
            low: null,
            high: null,
          },
          negationIndicator: null,
          negationReason: null,
          reasonCode: null,
          statusCode: {
            dataTypeName: "CD",
            code: "complete",
            codeSystem: "performed_activity.statusCode",
            displayName: "Complete",
          },
          statusDate: new Date("2024-11-06T09:00:00"),
          contextForStudySite: {
            id: "7cbc3369-7d06-4742-b6f1-b83f62d72f1e",
            label: "DGOI",
          },
          containingEpoch: {
            id: "4c0e30ba-8ef8-450f-b3c0-d489fa053c35",
            name: "Screening",
            typeCode: {
              dataTypeName: "CD",
              code: "screening",
              codeSystem: "epoch.type_code",
              displayName: null,
            },
            description: null,
          },
          instantiatedDefinedActivity: {
            id: "845ffa00-a139-4d38-8ccc-e53a89a2de03",
            nameCode: {
              dataTypeName: "CD",
              code: "ipt",
              codeSystem: "defined_activity.nameCode",
              displayName: "Immunophenotyping",
            },
            categoryCode: {
              dataTypeName: "CD",
              code: "lab",
              codeSystem: "defined_activity.categoryCode",
              displayName: "Laboratory",
            },
            subcategoryCode: null,
            description: null,
          },
        },
        {
          id: "8ac78da9-3c23-4770-94e9-ebaee8432b4b",
          comment: null,
          dateRange: {
            dataTypeName: "IVL[TS]",
            low: new Date("2024-10-30T03:00:00"),
            high: null,
          },
          negationIndicator: null,
          negationReason: null,
          reasonCode: null,
          statusCode: {
            dataTypeName: "CD",
            code: "complete",
            codeSystem: "performed_activity.statusCode",
            displayName: "Complete",
          },
          statusDate: new Date("2024-05-07T00:00:00"),
          contextForStudySite: {
            id: "7cbc3369-7d06-4742-b6f1-b83f62d72f1e",
            label: "DGOI",
          },
          containingEpoch: {
            id: "4c0e30ba-8ef8-450f-b3c0-d489fa053c35",
            name: "Screening",
            typeCode: {
              dataTypeName: "CD",
              code: "screening",
              codeSystem: "epoch.type_code",
              displayName: null,
            },
            description: null,
          },
          instantiatedDefinedActivity: {
            id: "f83ddbf8-dd6d-4737-98e3-a5795995bbd8",
            nameCode: {
              dataTypeName: "CD",
              code: "26604007",
              codeSystem: "defined_activity.nameCode",
              displayName: "Complete blood count",
            },
            categoryCode: {
              dataTypeName: "CD",
              code: "lab",
              codeSystem: "defined_activity.categoryCode",
              displayName: "Laboratory",
            },
            subcategoryCode: null,
            description: null,
          },
        },
        {
          id: "41cf4476-0dfd-4dc5-a43e-9f7abd6d2da3",
          comment: null,
          dateRange: {
            dataTypeName: "IVL[TS]",
            low: null,
            high: null,
          },
          negationIndicator: null,
          negationReason: null,
          reasonCode: null,
          statusCode: {
            dataTypeName: "CD",
            code: "unverified",
            codeSystem: "performed_activity.statusCode",
            displayName: "Unverified",
          },
          statusDate: new Date("2024-11-06T12:00:00"),
          contextForStudySite: {
            id: "7cbc3369-7d06-4742-b6f1-b83f62d72f1e",
            label: "DGOI",
          },
          containingEpoch: {
            id: "07205390-86e4-4955-a17b-0684fb70b1ef",
            name: "Induction",
            typeCode: {
              dataTypeName: "CD",
              code: "treatment",
              codeSystem: "epoch.type_code",
              displayName: null,
            },
            description: null,
          },
          instantiatedDefinedActivity: {
            id: "a20d96db-afc3-4e0d-a010-32662388c633",
            nameCode: {
              dataTypeName: "CD",
              code: "ame",
              codeSystem: "defined_activity.nameCode",
              displayName: "AME",
            },
            categoryCode: {
              dataTypeName: "CD",
              code: "treatment",
              codeSystem: "defined_activity.categoryCode",
              displayName: "Treatment",
            },
            subcategoryCode: null,
            description: null,
          },
        },
      ]);

    const { asFragment } = await renderComponentInRoute(
      <PersonTimelineCard personId={personId} />
    );
    await new Promise((r) => setTimeout(r, 1000));
    expect(asFragment()).toMatchSnapshot();
    expect(personSpy).toHaveBeenCalledTimes(1);
    expect(subjectsSpy).toHaveBeenCalledTimes(1);
  });
});
