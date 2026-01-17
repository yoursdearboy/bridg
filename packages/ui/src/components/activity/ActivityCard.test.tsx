import { describe, expect, it, vi } from "vitest";
import api from "@/api";
import { renderComponentInRoute } from "@/test-utils";
import { ActivityCard } from "./ActivityCard";

describe("ActivityCard", () => {
  it("matches snapshot", async () => {
    const spaceId = "ce946229-9746-46cd-8dd3-b27a2fbfd48a";
    const subjectId = "1944c046-95b3-4cb4-82e2-c789950e29fc";
    vi.spyOn(api, "listSubjectPerformedActivity").mockResolvedValue([
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
            codeSystem: "defined_activity.name_code",
            displayName: "Immunophenotyping",
          },
          categoryCode: {
            dataTypeName: "CD",
            code: "lab",
            codeSystem: "defined_activity.category_code",
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
          low: new Date("2024-11-02T00:00:00"),
          high: null,
        },
        negationIndicator: null,
        negationReason: null,
        reasonCode: null,
        statusCode: {
          dataTypeName: "CD",
          code: "complete",
          codeSystem: "performed_activity.status_code",
          displayName: "Complete",
        },
        statusDate: new Date("2024-11-04T12:00:00"),
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
            codeSystem: "defined_activity.name_code",
            displayName: "Complete blood count",
          },
          categoryCode: {
            dataTypeName: "CD",
            code: "lab",
            codeSystem: "defined_activity.category_code",
            displayName: "Laboratory",
          },
          subcategoryCode: null,
          description: null,
        },
      },
      {
        id: "42917902-91d6-4366-b518-1c457f8a2ef9",
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
          codeSystem: "performed_activity.status_code",
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
            codeSystem: "defined_activity.name_code",
            displayName: "AME",
          },
          categoryCode: {
            dataTypeName: "CD",
            code: "treatment",
            codeSystem: "defined_activity.category_code",
            displayName: "Treatment",
          },
          subcategoryCode: null,
          description: null,
        },
      },
    ]);
    vi.spyOn(api, "listSpaceActivity").mockResolvedValue([
      {
        id: "b72ae1a5-784d-4c9b-a4e4-7b09fddeefb7",
        usedDefinedActivity: {
          id: "845ffa00-a139-4d38-8ccc-e53a89a2de03",
          nameCode: {
            dataTypeName: "CD",
            code: "ipt",
            codeSystem: "defined_activity.name_code",
            displayName: "Immunophenotyping",
          },
          categoryCode: {
            dataTypeName: "CD",
            code: "lab",
            codeSystem: "defined_activity.category_code",
            displayName: "Laboratory",
          },
          subcategoryCode: null,
          description: null,
        },
      },
      {
        id: "66da8ea1-5e69-40f2-a720-9937430d582d",
        usedDefinedActivity: {
          id: "f83ddbf8-dd6d-4737-98e3-a5795995bbd8",
          nameCode: {
            dataTypeName: "CD",
            code: "26604007",
            codeSystem: "defined_activity.name_code",
            displayName: "Complete blood count",
          },
          categoryCode: {
            dataTypeName: "CD",
            code: "lab",
            codeSystem: "defined_activity.category_code",
            displayName: "Laboratory",
          },
          subcategoryCode: null,
          description: null,
        },
      },
      {
        id: "5a0141b3-e2a6-429a-94e5-a4f0083b954e",
        usedDefinedActivity: {
          id: "a20d96db-afc3-4e0d-a010-32662388c633",
          nameCode: {
            dataTypeName: "CD",
            code: "ame",
            codeSystem: "defined_activity.name_code",
            displayName: "AME",
          },
          categoryCode: {
            dataTypeName: "CD",
            code: "treatment",
            codeSystem: "defined_activity.category_code",
            displayName: "Treatment",
          },
          subcategoryCode: null,
          description: null,
        },
      },
      {
        id: "607e1a63-a2fb-47b7-8222-0ae82f8146b0",
        usedDefinedActivity: {
          id: "ef556a4b-2665-4319-948a-2c5fd9baad3f",
          nameCode: {
            dataTypeName: "CD",
            code: "ham",
            codeSystem: "defined_activity.name_code",
            displayName: "HAM",
          },
          categoryCode: {
            dataTypeName: "CD",
            code: "treatment",
            codeSystem: "defined_activity.category_code",
            displayName: "Treatment",
          },
          subcategoryCode: null,
          description: null,
        },
      },
    ]);
    const { asFragment } = await renderComponentInRoute(
      <ActivityCard spaceId={spaceId} subjectId={subjectId} />
    );
    await new Promise((r) => setTimeout(r, 1000));
    expect(asFragment()).toMatchSnapshot();
  });
});
