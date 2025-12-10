import type { ConceptDescriptor } from "api-ts";

export const isEqualCD = (a: ConceptDescriptor, b: ConceptDescriptor) =>
  a.code == b.code && a.codeSystem == b.codeSystem;
