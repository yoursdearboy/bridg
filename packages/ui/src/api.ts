import { Configuration, CodeSystemApi, DefaultApi } from "@bridg/api-ts";

const config = new Configuration({
  basePath: "/api",
});

export const defaultApi = new DefaultApi(config);
export const codeSystemApi = new CodeSystemApi(config);

export default defaultApi;
