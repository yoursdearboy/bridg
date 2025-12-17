import { queryOptions } from "@tanstack/react-query";
import { expect, it } from "vitest";
import { renderRoute } from "@/test-utils";
import { Route } from "./$aId.edit";

it("edit activity page renders correctly", async () => {
  const spaceId = "ce946229-9746-46cd-8dd3-b27a2fbfd48a";
  const subjectId = "1944c046-95b3-4cb4-82e2-c789950e29fc";
  const aId = "8ac78da9-3c23-4770-94e9-ebaee8432b4b";
  const dAId = "f83ddbf8-dd6d-4737-98e3-a5795995bbd8";
  const performedActivity = {
    id: aId,
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
      codeSystem: "performed_activity.status_code",
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
      typeCode: "screening",
      description: null,
    },
    instantiatedDefinedActivity: {
      id: dAId,
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
    resultedPerformedObservationResult: [
      {
        value: {
          dataTypeName: "TS.DATE",
          value: new Date("1991-01-01"),
        },
        id: "64c6048b-bff1-4e41-be4d-16bdaf6d6cad",
        typeCode: {
          dataTypeName: "CD",
          code: "fullmoon",
          codeSystem: "demo",
          displayName: "Last full moon date",
        },
        valueNullFlavorReason: null,
        baselineIndicator: null,
        derivedIndicator: null,
        createdDate: null,
        reportedDate: null,
        comment: null,
      },
      {
        value: {
          dataTypeName: "ST",
          value: "some 1991-01-01",
        },
        id: "e4417100-5b5c-4fcb-8cf4-39abff32d7a3",
        typeCode: {
          dataTypeName: "CD",
          code: "somestr",
          codeSystem: "demo",
          displayName: null,
        },
        valueNullFlavorReason: null,
        baselineIndicator: null,
        derivedIndicator: null,
        createdDate: null,
        reportedDate: null,
        comment: null,
      },
      {
        value: {
          dataTypeName: "CD",
          code: "M2",
          codeSystem: "b365b97f-ff34-464c-9097-e7daec409f4c",
          displayName: "Acute myeloblastic leukemia with maturation",
        },
        id: "87e88e28-6f60-4d5b-aa8b-1e67b9557348",
        typeCode: {
          dataTypeName: "CD",
          code: "dx",
          codeSystem: "demo",
          displayName: "Diagnosis",
        },
        valueNullFlavorReason: null,
        baselineIndicator: null,
        derivedIndicator: null,
        createdDate: null,
        reportedDate: null,
        comment: null,
      },
      {
        value: {
          dataTypeName: "PQ",
          value: 8.0,
          unit: "10^9/l",
        },
        id: "dc674dfb-3cb0-4a11-9dbd-7e2005d6a698",
        typeCode: {
          dataTypeName: "CD",
          code: "767002",
          codeSystem: "SNOMEDCT",
          displayName: "White blood cell count",
        },
        valueNullFlavorReason: null,
        baselineIndicator: null,
        derivedIndicator: null,
        createdDate: null,
        reportedDate: null,
        comment: null,
      },
      {
        value: {
          dataTypeName: "PQ",
          value: 5.0,
          unit: null,
        },
        id: "828c38b4-b566-4fc2-9933-4b8d3e06eb64",
        typeCode: {
          dataTypeName: "CD",
          code: "30630007",
          codeSystem: "SNOMEDCT",
          displayName: "Neutrophil count",
        },
        valueNullFlavorReason: null,
        baselineIndicator: null,
        derivedIndicator: null,
        createdDate: null,
        reportedDate: null,
        comment: null,
      },
      {
        value: {
          dataTypeName: "PQ",
          value: 200.0,
          unit: null,
        },
        id: "fdfc31f5-9b1d-4b0e-a38c-0ccd05909a58",
        typeCode: {
          dataTypeName: "CD",
          code: "61928009",
          codeSystem: "SNOMEDCT",
          displayName: "Platelet count",
        },
        valueNullFlavorReason: null,
        baselineIndicator: null,
        derivedIndicator: null,
        createdDate: null,
        reportedDate: null,
        comment: null,
      },
    ],
  };
  const definedActivity = {
    id: dAId,
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
  };
  const editActivityQuery = queryOptions({
    queryKey: ["subject", subjectId, "activity", aId],
    queryFn: () => ({
      performedActivity,
      definedActivity,
    }),
  });
  const subjectQuery = queryOptions({
    queryKey: ["subject", subjectId],
    queryFn: () => ({
      id: subjectId,
      status: "eligible",
      statusDate: new Date("2024-11-06T12:00:00"),
      performingBiologicEntity: {
        id: "8498d20d-6c84-4f09-96c5-5af3a557b1e3",
        administrativeGenderCode: "M",
        birthDate: new Date("1991-01-01"),
        deathDate: null,
        deathDateEstimatedIndicator: null,
        deathIndicator: false,
        primaryName: {
          id: "9de936fd-75b4-4021-a31f-4a243033b59f",
          label: "Donald Trump Jr",
        },
      },
      performingOrganization: null,
    }),
  });
  expect(
    (
      await renderRoute(Route, {
        params: { spaceId, subjectId, aId },
        beforeLoad: () => ({
          editActivityQuery,
          subjectQuery,
        }),
      })
    ).asFragment()
  ).toMatchSnapshot();
});
