import { expect, it, vi } from "vitest";
import api from "@/api";
import { renderRoute } from "@/test-utils";
import { Route } from "./new";

it("new page renders correctly", async () => {
  vi.spyOn(api.sites, "indexSpacesSpaceIdSitesGet").mockResolvedValue([
    {
      id: "6a8e6e2b-9537-408f-bd92-a5b83ad2e750",
      executingStudySite: "DGOI",
    },
    {
      id: "3a819069-2aa2-49df-a979-e4237f77cf6e",
      executingStudySite: "EKB",
    },
  ]);
  const lookupSpy = vi
    .spyOn(api.subjects, "lookupSpacesSpaceIdSubjectsLookupPost")
    .mockResolvedValue([
      {
        performingBiologicEntity: "Donald Trump Jr",
        performingBiologicEntityId: "8498d20d-6c84-4f09-96c5-5af3a557b1e3",
      },
    ]);

  expect(
    (
      await renderRoute(Route, {
        params: {
          spaceId: "xxxx",
        },
      })
    ).asFragment()
  ).toMatchSnapshot();

  // TODO: enter value into name and check lookupSpy have been called twice
  expect(lookupSpy).toHaveBeenCalledTimes(1);

  // TODO: click on Donald and make snapshot
  // TODO: click reset button on Donald card and make snapshot
});

// TODO: check submission using spy when no person selected
// TODO: check submission using spy when Donald selected
