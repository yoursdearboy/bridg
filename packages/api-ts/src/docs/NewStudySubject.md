
# NewStudySubject


## Properties

Name | Type
------------ | -------------
`status` | [Status](Status.md)
`statusDate` | Date
`performingBiologicEntity` | [PersonData](PersonData.md)
`performingBiologicEntityId` | string
`assignedStudySiteProtocolVersionRelationship` | Array&lt;string&gt;

## Example

```typescript
import type { NewStudySubject } from ''

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "statusDate": null,
  "performingBiologicEntity": null,
  "performingBiologicEntityId": null,
  "assignedStudySiteProtocolVersionRelationship": null,
} satisfies NewStudySubject

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NewStudySubject
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


