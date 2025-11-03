
# TelecommunicationAddressData


## Properties

Name | Type
------------ | -------------
`use` | [TelecommunicationAddressUse](TelecommunicationAddressUse.md)
`scheme` | [URLScheme](URLScheme.md)
`address` | string

## Example

```typescript
import type { TelecommunicationAddressData } from ''

// TODO: Update the object below with actual values
const example = {
  "use": null,
  "scheme": null,
  "address": null,
} satisfies TelecommunicationAddressData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TelecommunicationAddressData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


