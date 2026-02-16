/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  ConceptDescriptor: { input: any; output: any };
  /** Date (isoformat) */
  Date: { input: any; output: any };
  InstanceIdentifier: { input: any; output: any };
  UUID: { input: any; output: any };
};

export enum AdministrativeGender {
  Female = "female",
  Male = "male",
  Unknown = "unknown",
}

export type BiologicEntity = {
  __typename?: "BiologicEntity";
  administrativeGenderCode?: Maybe<AdministrativeGender>;
  birthDate?: Maybe<Scalars["Date"]["output"]>;
  deathDate?: Maybe<Scalars["Date"]["output"]>;
  deathDateEstimatedIndicator?: Maybe<Scalars["Boolean"]["output"]>;
  deathIndicator?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  identifier: Array<BiologicEntityIdentifier>;
  name: Array<BiologicEntityName>;
  type: Scalars["String"]["output"];
};

export type BiologicEntityIdentifier = {
  __typename?: "BiologicEntityIdentifier";
  id: Scalars["ID"]["output"];
  identifier: Scalars["InstanceIdentifier"]["output"];
  identifierTypeCode?: Maybe<Scalars["ConceptDescriptor"]["output"]>;
};

export type BiologicEntityIdentifierInput = {
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  identifier: Scalars["InstanceIdentifier"]["input"];
  identifierTypeCode?: InputMaybe<Scalars["ConceptDescriptor"]["input"]>;
};

export type BiologicEntityInput = {
  administrativeGenderCode?: InputMaybe<AdministrativeGender>;
  birthDate?: InputMaybe<Scalars["Date"]["input"]>;
  deathDate?: InputMaybe<Scalars["Date"]["input"]>;
  deathDateEstimatedIndicator?: InputMaybe<Scalars["Boolean"]["input"]>;
  deathIndicator?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  identifier?: InputMaybe<Array<BiologicEntityIdentifierInput>>;
  name?: InputMaybe<Array<BiologicEntityNameInput>>;
};

export type BiologicEntityName = {
  __typename?: "BiologicEntityName";
  family?: Maybe<Scalars["String"]["output"]>;
  given?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  middle?: Maybe<Scalars["String"]["output"]>;
  patronymic?: Maybe<Scalars["String"]["output"]>;
  prefix?: Maybe<Scalars["String"]["output"]>;
  suffix?: Maybe<Scalars["String"]["output"]>;
  use?: Maybe<Scalars["String"]["output"]>;
};

export type BiologicEntityNameInput = {
  family?: InputMaybe<Scalars["String"]["input"]>;
  given?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  middle?: InputMaybe<Scalars["String"]["input"]>;
  patronymic?: InputMaybe<Scalars["String"]["input"]>;
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  suffix?: InputMaybe<Scalars["String"]["input"]>;
  use?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  person: Person;
  subject: Subject;
};

export type MutationPersonArgs = {
  input: PersonInput;
};

export type MutationSubjectArgs = {
  input: SubjectInput;
};

export type Person = {
  __typename?: "Person";
  administrativeGenderCode?: Maybe<AdministrativeGender>;
  birthDate?: Maybe<Scalars["Date"]["output"]>;
  deathDate?: Maybe<Scalars["Date"]["output"]>;
  deathDateEstimatedIndicator?: Maybe<Scalars["Boolean"]["output"]>;
  deathIndicator?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  identifier: Array<BiologicEntityIdentifier>;
  name: Array<BiologicEntityName>;
  type: Scalars["String"]["output"];
};

export type PersonInput = {
  administrativeGenderCode?: InputMaybe<AdministrativeGender>;
  birthDate?: InputMaybe<Scalars["Date"]["input"]>;
  deathDate?: InputMaybe<Scalars["Date"]["input"]>;
  deathDateEstimatedIndicator?: InputMaybe<Scalars["Boolean"]["input"]>;
  deathIndicator?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  identifier?: InputMaybe<Array<BiologicEntityIdentifierInput>>;
  name?: InputMaybe<Array<BiologicEntityNameInput>>;
};

export type Query = {
  __typename?: "Query";
  person: Array<Person>;
  subject: Array<Subject>;
};

export type QueryPersonArgs = {
  id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type QuerySubjectArgs = {
  id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Subject = {
  __typename?: "Subject";
  id: Scalars["ID"]["output"];
  performingBiologicEntity: BiologicEntity;
};

export type SubjectInput = {
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  performingBiologicEntity?: InputMaybe<BiologicEntityInput>;
  performingBiologicEntityId?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type PersonQueryVariables = Exact<{
  id?: InputMaybe<Scalars["UUID"]["input"]>;
}>;

export type PersonQuery = {
  __typename?: "Query";
  person: Array<{
    __typename?: "Person";
    id: string;
    type: string;
    birthDate?: any | null;
    deathDate?: any | null;
    deathDateEstimatedIndicator?: boolean | null;
    deathIndicator?: boolean | null;
    identifier: Array<{
      __typename?: "BiologicEntityIdentifier";
      identifier: any;
      identifierTypeCode?: any | null;
      id: string;
    }>;
    name: Array<{
      __typename?: "BiologicEntityName";
      use?: string | null;
      family?: string | null;
      given?: string | null;
      middle?: string | null;
      patronymic?: string | null;
      prefix?: string | null;
      suffix?: string | null;
      id: string;
    }>;
  }>;
};

export type SubjectQueryVariables = Exact<{
  id?: InputMaybe<Scalars["UUID"]["input"]>;
}>;

export type SubjectQuery = {
  __typename?: "Query";
  subject: Array<{
    __typename?: "Subject";
    id: string;
    performingBiologicEntity: {
      __typename?: "BiologicEntity";
      id: string;
      type: string;
      birthDate?: any | null;
      deathDate?: any | null;
      deathDateEstimatedIndicator?: boolean | null;
      deathIndicator?: boolean | null;
    };
  }>;
};

export const PersonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "person" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                { kind: "Field", name: { kind: "Name", value: "deathDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "deathDateEstimatedIndicator" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "deathIndicator" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "identifier" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "identifier" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "identifierTypeCode" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "name" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "use" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "family" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "given" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "middle" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "patronymic" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prefix" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "suffix" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PersonQuery, PersonQueryVariables>;
export const SubjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "subject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "performingBiologicEntity" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "birthDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deathDate" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "deathDateEstimatedIndicator",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deathIndicator" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubjectQuery, SubjectQueryVariables>;
