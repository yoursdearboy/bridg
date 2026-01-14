import { describe, expect, it, vi } from "vitest";
import api from "@/api";
import { renderComponentInRoute } from "@/test-utils";
import { ActivityMenu } from "./ActivityMenu";

describe("ActivityCard", () => {
  it("matches snapshot", async () => {
    const spaceId = "ce946229-9746-46cd-8dd3-b27a2fbfd48a";
    const subjectId = "1944c046-95b3-4cb4-82e2-c789950e29fc";
    vi.spyOn(
      api.spaceActivity,
      "indexSpaceSpaceIdActivityGet"
    ).mockResolvedValue([
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
      <ActivityMenu spaceId={spaceId} subjectId={subjectId} />
    );
    await new Promise((r) => setTimeout(r, 2000));
    expect(asFragment()).toMatchSnapshot();
  });
});
