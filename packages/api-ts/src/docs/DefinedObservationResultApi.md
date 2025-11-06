# DefinedObservationResultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**indexSpacesSpaceIdActivityObsIdResultGet**](DefinedObservationResultApi.md#indexspacesspaceidactivityobsidresultget) | **GET** /spaces/{space_id}/activity/{obs_id}/result | Index |



## indexSpacesSpaceIdActivityObsIdResultGet

> Array&lt;DefinedObservationResult&gt; indexSpacesSpaceIdActivityObsIdResultGet(spaceId, obsId)

Index

### Example

```ts
import {
  Configuration,
  DefinedObservationResultApi,
} from '';
import type { IndexSpacesSpaceIdActivityObsIdResultGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefinedObservationResultApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    obsId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexSpacesSpaceIdActivityObsIdResultGetRequest;

  try {
    const data = await api.indexSpacesSpaceIdActivityObsIdResultGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **spaceId** | `string` |  | [Defaults to `undefined`] |
| **obsId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;DefinedObservationResult&gt;**](DefinedObservationResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

