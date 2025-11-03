
# ApiSubjectStudySubjectPerson


## Properties

Name | Type
------------ | -------------
`administrativeGenderCode` | [AdministrativeGender](AdministrativeGender.md)
`birthDate` | Date
`deathDate` | Date
`deathDateEstimatedIndicator` | boolean
`deathIndicator` | boolean
`id` | string
`primaryName` | [EntityName](EntityName.md)

## Example

```typescript
import type { ApiSubjectStudySubjectPerson } from ''

// TODO: Update the object below with actual values
const example = {
  "administrativeGenderCode": null,
  "birthDate": null,
  "deathDate": null,
  "deathDateEstimatedIndicator": null,
  "deathIndicator": null,
  "id": null,
  "primaryName": null,
} satisfies ApiSubjectStudySubjectPerson

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiSubjectStudySubjectPerson
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


