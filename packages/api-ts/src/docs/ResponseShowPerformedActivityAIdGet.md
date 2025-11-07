
# ResponseShowPerformedActivityAIdGet


## Properties

Name | Type
------------ | -------------
`id` | string
`reasonCode` | [ConceptDescriptor](ConceptDescriptor.md)
`statusCode` | [ConceptDescriptor](ConceptDescriptor.md)
`statusDate` | Date
`contextForStudySite` | [StudySite](StudySite.md)
`containingEpoch` | [Epoch](Epoch.md)
`instantiatedDefinedActivity` | [DefinedActivity](DefinedActivity.md)
`resultedPerformedObservationResult` | [Array&lt;PerformedObservationResult&gt;](PerformedObservationResult.md)

## Example

```typescript
import type { ResponseShowPerformedActivityAIdGet } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "reasonCode": null,
  "statusCode": null,
  "statusDate": null,
  "contextForStudySite": null,
  "containingEpoch": null,
  "instantiatedDefinedActivity": null,
  "resultedPerformedObservationResult": null,
} satisfies ResponseShowPerformedActivityAIdGet

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResponseShowPerformedActivityAIdGet
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


