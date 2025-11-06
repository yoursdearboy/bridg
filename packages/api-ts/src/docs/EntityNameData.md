
# EntityNameData


## Properties

Name | Type
------------ | -------------
`use` | string
`family` | string
`given` | string
`middle` | string
`patronymic` | string
`prefix` | string
`suffix` | string

## Example

```typescript
import type { EntityNameData } from ''

// TODO: Update the object below with actual values
const example = {
  "use": null,
  "family": null,
  "given": null,
  "middle": null,
  "patronymic": null,
  "prefix": null,
  "suffix": null,
} satisfies EntityNameData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityNameData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


