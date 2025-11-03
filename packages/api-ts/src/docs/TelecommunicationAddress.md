
# TelecommunicationAddress


## Properties

Name | Type
------------ | -------------
`use` | [TelecommunicationAddressUse](TelecommunicationAddressUse.md)
`scheme` | [URLScheme](URLScheme.md)
`address` | string
`id` | string
`label` | string

## Example

```typescript
import type { TelecommunicationAddress } from ''

// TODO: Update the object below with actual values
const example = {
  "use": null,
  "scheme": null,
  "address": null,
  "id": null,
  "label": null,
} satisfies TelecommunicationAddress

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TelecommunicationAddress
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


