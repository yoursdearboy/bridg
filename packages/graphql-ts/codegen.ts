import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://127.0.0.1:8001",
  // This assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["queries/**/*.graphql"],
  // Don't exit with non-zero status when there are no documents
  ignoreNoDocuments: true,
  generates: {
    // Use a path that works the best for the structure of your application
    "./src/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        addTypename: true,
        immutableTypes: false,
        skipTypename: false, // include __typename fields
        avoidOptionals: false,
        enumsAsTypes: false,
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
