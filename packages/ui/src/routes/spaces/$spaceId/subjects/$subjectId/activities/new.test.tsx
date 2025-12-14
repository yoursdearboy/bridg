import { queryOptions } from "@tanstack/react-query";
import { expect, it, vi } from "vitest";
import api from "@/api";
import { renderRoute } from "@/test-utils";
import { Route } from "./new";

it("new activity page renders correctly", async () => {
  const definedActivitySpy = vi
    .spyOn(api.definedActivity, "showDefinedActivityAIdGet")
    .mockResolvedValue({
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
      producedDefinedObservationResult: [
        {
          value: null,
          id: "493ecc52-7a02-4beb-85eb-a62101e594cb",
          valueNegationIndicator: null,
          typeCode: {
            dataTypeName: "CD",
            code: "fullmoon",
            codeSystem: "demo",
            displayName: "Last full moon date",
          },
          targetType: "TS.DATE",
          targetCodingSystem: null,
          targetUnit: null,
          derivationExpression: null,
        },
        {
          value: null,
          id: "7a7bf292-1f90-4db4-8c2f-3cc6e9ab988d",
          valueNegationIndicator: null,
          typeCode: {
            dataTypeName: "CD",
            code: "dx",
            codeSystem: "demo",
            displayName: "Diagnosis",
          },
          targetType: "CD",
          targetCodingSystem: "b365b97f-ff34-464c-9097-e7daec409f4c",
          targetUnit: null,
          derivationExpression: null,
        },
        {
          value: null,
          id: "3620e8b3-ff10-411c-9325-6095497c60c0",
          valueNegationIndicator: null,
          typeCode: {
            dataTypeName: "CD",
            code: "767002",
            codeSystem: "SNOMEDCT",
            displayName: "White blood cell count",
          },
          targetType: "PQ",
          targetCodingSystem: null,
          targetUnit: "10^9/l",
          derivationExpression: null,
        },
        {
          value: null,
          id: "924917bc-39bb-46c4-9109-71e923e520eb",
          valueNegationIndicator: null,
          typeCode: {
            dataTypeName: "CD",
            code: "30630007",
            codeSystem: "SNOMEDCT",
            displayName: "Neutrophil count",
          },
          targetType: "PQ",
          targetCodingSystem: null,
          targetUnit: "10^9/l",
          derivationExpression: null,
        },
        {
          value: null,
          id: "15e8a08b-b09e-4af2-bbfa-969f93dbc4b5",
          valueNegationIndicator: null,
          typeCode: {
            dataTypeName: "CD",
            code: "61928009",
            codeSystem: "SNOMEDCT",
            displayName: "Platelet count",
          },
          targetType: "PQ",
          targetCodingSystem: null,
          targetUnit: null,
          derivationExpression: null,
        },
      ],
    });

  expect(
    (
      await renderRoute(Route, {
        params: {
          spaceId: "xxxx",
          subjectId: "xxxx",
        },
        search: {
          aId: "xxxx",
        },
        context: {
          activityQuery: queryOptions({
            queryKey: [],
            queryFn: () => definedActivitySpy.mock,
          }),
        },
      })
    ).asFragment()
  ).toMatchSnapshot();
});
