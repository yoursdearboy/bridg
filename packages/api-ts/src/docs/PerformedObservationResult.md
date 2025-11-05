
# PerformedObservationResult


## Properties

Name | Type
------------ | -------------
`id` | string
`typeCode` | [ConceptDescriptor](ConceptDescriptor.md)
`value` | [Value](Value.md)
`valueNullFlavorReason` | string
`baselineIndicator` | boolean
`derivedIndicator` | boolean
`createdDate` | Date
`reportedDate` | Date
`comment` | string

## Example

```typescript
import type { PerformedObservationResult } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "typeCode": null,
  "value": null,
  "valueNullFlavorReason": null,
  "baselineIndicator": null,
  "derivedIndicator": null,
  "createdDate": null,
  "reportedDate": null,
  "comment": null,
} satisfies PerformedObservationResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PerformedObservationResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


