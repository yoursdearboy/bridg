
# ApiSubjectNewStudySubjectPerson


## Properties

Name | Type
------------ | -------------
`type` | string
`administrativeGenderCode` | [AdministrativeGender](AdministrativeGender.md)
`birthDate` | Date
`deathDate` | Date
`deathDateEstimatedIndicator` | boolean
`deathIndicator` | boolean
`name` | [EntityNameData](EntityNameData.md)

## Example

```typescript
import type { ApiSubjectNewStudySubjectPerson } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "administrativeGenderCode": null,
  "birthDate": null,
  "deathDate": null,
  "deathDateEstimatedIndicator": null,
  "deathIndicator": null,
  "name": null,
} satisfies ApiSubjectNewStudySubjectPerson

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiSubjectNewStudySubjectPerson
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


