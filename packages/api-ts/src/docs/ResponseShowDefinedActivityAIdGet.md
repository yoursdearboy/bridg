
# ResponseShowDefinedActivityAIdGet


## Properties

Name | Type
------------ | -------------
`id` | string
`nameCode` | [ConceptDescriptor](ConceptDescriptor.md)
`categoryCode` | [ConceptDescriptor](ConceptDescriptor.md)
`subcategoryCode` | [ConceptDescriptor](ConceptDescriptor.md)
`description` | string
`producedDefinedObservationResult` | [Array&lt;DefinedObservationResult&gt;](DefinedObservationResult.md)

## Example

```typescript
import type { ResponseShowDefinedActivityAIdGet } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "nameCode": null,
  "categoryCode": null,
  "subcategoryCode": null,
  "description": null,
  "producedDefinedObservationResult": null,
} satisfies ResponseShowDefinedActivityAIdGet

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResponseShowDefinedActivityAIdGet
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


