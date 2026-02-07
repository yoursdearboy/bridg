/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ConceptDescriptor: { input: unknown; output: unknown; }
  /** Date (isoformat) */
  Date: { input: unknown; output: unknown; }
  InstanceIdentifier: { input: unknown; output: unknown; }
  UUID: { input: unknown; output: unknown; }
};

export enum AdministrativeGender {
  Female = 'female',
  Male = 'male',
  Unknown = 'unknown'
}

export type BiologicEntityIdentifier = {
  __typename: 'BiologicEntityIdentifier';
  id: Scalars['ID']['output'];
  identifier: Scalars['InstanceIdentifier']['output'];
  identifierTypeCode: Maybe<Scalars['ConceptDescriptor']['output']>;
};

export type BiologicEntityIdentifierInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier: Scalars['InstanceIdentifier']['input'];
  identifierTypeCode?: InputMaybe<Scalars['ConceptDescriptor']['input']>;
};

export type BiologicEntityName = {
  __typename: 'BiologicEntityName';
  family: Maybe<Scalars['String']['output']>;
  given: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  middle: Maybe<Scalars['String']['output']>;
  patronymic: Maybe<Scalars['String']['output']>;
  prefix: Maybe<Scalars['String']['output']>;
  suffix: Maybe<Scalars['String']['output']>;
  use: Maybe<Scalars['String']['output']>;
};

export type BiologicEntityNameInput = {
  family?: InputMaybe<Scalars['String']['input']>;
  given?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  middle?: InputMaybe<Scalars['String']['input']>;
  patronymic?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  suffix?: InputMaybe<Scalars['String']['input']>;
  use?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename: 'Mutation';
  person: Person;
};


export type MutationPersonArgs = {
  input: PersonInput;
};

export type Person = {
  __typename: 'Person';
  administrativeGenderCode: Maybe<AdministrativeGender>;
  birthDate: Maybe<Scalars['Date']['output']>;
  deathDate: Maybe<Scalars['Date']['output']>;
  deathDateEstimatedIndicator: Maybe<Scalars['Boolean']['output']>;
  deathIndicator: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  identifier: Array<BiologicEntityIdentifier>;
  name: Array<BiologicEntityName>;
  type: Scalars['String']['output'];
};

export type PersonInput = {
  administrativeGenderCode?: InputMaybe<AdministrativeGender>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  deathDate?: InputMaybe<Scalars['Date']['input']>;
  deathDateEstimatedIndicator?: InputMaybe<Scalars['Boolean']['input']>;
  deathIndicator?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier?: InputMaybe<Array<BiologicEntityIdentifierInput>>;
  name?: InputMaybe<Array<BiologicEntityNameInput>>;
};

export type Query = {
  __typename: 'Query';
  person: Array<Person>;
};
