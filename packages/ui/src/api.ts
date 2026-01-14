import { Configuration, CodeSystemApi, DefaultApi } from "api-ts";

const config = new Configuration({
  basePath: "/api",
});

export const defaultApi = new DefaultApi(config);
export const codeSystemApi = new CodeSystemApi(config);

export default defaultApi;
