
# PostalAddressData


## Properties

Name | Type
------------ | -------------
`use` | string
`street` | string
`building` | string
`country` | string
`municipality` | string
`state` | string
`zip` | string

## Example

```typescript
import type { PostalAddressData } from ''

// TODO: Update the object below with actual values
const example = {
  "use": null,
  "street": null,
  "building": null,
  "country": null,
  "municipality": null,
  "state": null,
  "zip": null,
} satisfies PostalAddressData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PostalAddressData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


