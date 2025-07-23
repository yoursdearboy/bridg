import { DefaultApi, Configuration } from "bridg-ts";

const config = new Configuration({
  basePath: "/api",
});

export default new DefaultApi(config);
