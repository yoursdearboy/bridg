
# PersonStudySubject


## Properties

Name | Type
------------ | -------------
`id` | string
`status` | [Status](Status.md)
`statusDate` | Date
`assignedStudySiteProtocolVersionRelationship` | [Array&lt;StudySiteProtocolVersionRelationship&gt;](StudySiteProtocolVersionRelationship.md)

## Example

```typescript
import type { PersonStudySubject } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "status": null,
  "statusDate": null,
  "assignedStudySiteProtocolVersionRelationship": null,
} satisfies PersonStudySubject

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonStudySubject
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


