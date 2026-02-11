/* eslint-disable */
import * as types from './graphql';

type Documents = {
  '\n query Person { \n person { \n administrativeGenderCode \n name { \n family \n given \n middle \n patronymic \n\n }\n birthDate\n deathDate\n deathDateEstimatedIndicator\n deathIndicator\n id\n type\n identifier {\n id\n identifier\n identifierTypeCode\n }\n }\n }': typeof types.AllPerson;
};

const documents: Documents = {
  '\n query Person { \n person { \n administrativeGenderCode \n name { \n family \n given \n middle \n patronymic \n\n }\n birthDate\n deathDate\n deathDateEstimatedIndicator\n deathIndicator\n id\n type\n identifier {\n id\n identifier\n identifierTypeCode\n }\n }\n }': types.AllPerson
}

export function gql(
  source:   '\n query Person { \n person { \n administrativeGenderCode \n name { \n family \n given \n middle \n patronymic \n\n }\n birthDate\n deathDate\n deathDateEstimatedIndicator\n deathIndicator\n id\n type\n identifier {\n id\n identifier\n identifierTypeCode\n }\n }\n }'
): typeof types.AllPerson;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
