/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ConceptDescriptor: { input: any; output: any; }
  /** Date (isoformat) */
  Date: { input: any; output: any; }
  InstanceIdentifier: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum AdministrativeGender {
  Female = 'female',
  Male = 'male',
  Unknown = 'unknown'
}

export type BiologicEntityIdentifier = {
  __typename?: 'BiologicEntityIdentifier';
  id: Scalars['ID']['output'];
  identifier: Scalars['InstanceIdentifier']['output'];
  identifierTypeCode?: Maybe<Scalars['ConceptDescriptor']['output']>;
};

export type BiologicEntityIdentifierInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  identifier: Scalars['InstanceIdentifier']['input'];
  identifierTypeCode?: InputMaybe<Scalars['ConceptDescriptor']['input']>;
};

export type BiologicEntityName = {
  __typename?: 'BiologicEntityName';
  family?: Maybe<Scalars['String']['output']>;
  given?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  middle?: Maybe<Scalars['String']['output']>;
  patronymic?: Maybe<Scalars['String']['output']>;
  prefix?: Maybe<Scalars['String']['output']>;
  suffix?: Maybe<Scalars['String']['output']>;
  use?: Maybe<Scalars['String']['output']>;
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
  __typename?: 'Mutation';
  person: Person;
};


export type MutationPersonArgs = {
  input: PersonInput;
};

export type Person = {
  __typename?: 'Person';
  administrativeGenderCode?: Maybe<AdministrativeGender>;
  birthDate?: Maybe<Scalars['Date']['output']>;
  deathDate?: Maybe<Scalars['Date']['output']>;
  deathDateEstimatedIndicator?: Maybe<Scalars['Boolean']['output']>;
  deathIndicator?: Maybe<Scalars['Boolean']['output']>;
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
  __typename?: 'Query';
  person: Array<Person>;
};

export type PersonQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonQuery = { __typename?: 'Query', person: Array<{ __typename?: 'Person', id: string, type: string, birthDate?: any | null, deathDate?: any | null, deathDateEstimatedIndicator?: boolean | null, deathIndicator?: boolean | null, identifier: Array<{ __typename?: 'BiologicEntityIdentifier', identifier: any, identifierTypeCode?: any | null, id: string }>, name: Array<{ __typename?: 'BiologicEntityName', use?: string | null, family?: string | null, given?: string | null, middle?: string | null, patronymic?: string | null, prefix?: string | null, suffix?: string | null, id: string }> }> };


export const PersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"deathDate"}},{"kind":"Field","name":{"kind":"Name","value":"deathDateEstimatedIndicator"}},{"kind":"Field","name":{"kind":"Name","value":"deathIndicator"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"identifierTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"use"}},{"kind":"Field","name":{"kind":"Name","value":"family"}},{"kind":"Field","name":{"kind":"Name","value":"given"}},{"kind":"Field","name":{"kind":"Name","value":"middle"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PersonQuery, PersonQueryVariables>;
export type PersonQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonQuery = { __typename?: 'Query', person: Array<{ __typename?: 'Person', id: string, type: string, birthDate?: any | null, deathDate?: any | null, deathDateEstimatedIndicator?: boolean | null, deathIndicator?: boolean | null, identifier: Array<{ __typename?: 'BiologicEntityIdentifier', identifier: any, identifierTypeCode?: any | null, id: string }>, name: Array<{ __typename?: 'BiologicEntityName', use?: string | null, family?: string | null, given?: string | null, middle?: string | null, patronymic?: string | null, prefix?: string | null, suffix?: string | null, id: string }> }> };


export const PersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"deathDate"}},{"kind":"Field","name":{"kind":"Name","value":"deathDateEstimatedIndicator"}},{"kind":"Field","name":{"kind":"Name","value":"deathIndicator"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"identifierTypeCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"use"}},{"kind":"Field","name":{"kind":"Name","value":"family"}},{"kind":"Field","name":{"kind":"Name","value":"given"}},{"kind":"Field","name":{"kind":"Name","value":"middle"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PersonQuery, PersonQueryVariables>;

export const PersonDocument = gql`
    query person {
  person {
    id
    type
    birthDate
    deathDate
    deathDateEstimatedIndicator
    deathIndicator
    identifier {
      identifier
      identifierTypeCode
      id
    }
    name {
      use
      family
      given
      middle
      patronymic
      prefix
      suffix
      id
    }
  }
}
    `;

/**
 * __usePersonQuery__
 *
 * To run a query within a React component, call `usePersonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonQuery(baseOptions?: Apollo.QueryHookOptions<PersonQuery, PersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
      }
export function usePersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
// @ts-ignore
export function usePersonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PersonQuery, PersonQueryVariables>): Apollo.UseSuspenseQueryResult<PersonQuery, PersonQueryVariables>;
export function usePersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PersonQuery, PersonQueryVariables>): Apollo.UseSuspenseQueryResult<PersonQuery | undefined, PersonQueryVariables>;
export function usePersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonLazyQueryHookResult = ReturnType<typeof usePersonLazyQuery>;
export type PersonSuspenseQueryHookResult = ReturnType<typeof usePersonSuspenseQuery>;
export type PersonQueryResult = Apollo.QueryResult<PersonQuery, PersonQueryVariables>;