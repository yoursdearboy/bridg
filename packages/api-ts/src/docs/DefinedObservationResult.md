
# DefinedObservationResult


## Properties

Name | Type
------------ | -------------
`id` | string
`value` | [Value](Value.md)
`valueNegationIndicator` | boolean
`typeCode` | [ConceptDescriptor](ConceptDescriptor.md)
`derivationExpression` | string

## Example

```typescript
import type { DefinedObservationResult } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "value": null,
  "valueNegationIndicator": null,
  "typeCode": null,
  "derivationExpression": null,
} satisfies DefinedObservationResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DefinedObservationResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


