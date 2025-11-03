# SitesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**indexSpacesSpaceIdSitesGet**](SitesApi.md#indexspacesspaceidsitesget) | **GET** /spaces/{space_id}/sites | Index |



## indexSpacesSpaceIdSitesGet

> Array&lt;StudySiteProtocolVersionRelationship&gt; indexSpacesSpaceIdSitesGet(spaceId)

Index

### Example

```ts
import {
  Configuration,
  SitesApi,
} from '';
import type { IndexSpacesSpaceIdSitesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SitesApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexSpacesSpaceIdSitesGetRequest;

  try {
    const data = await api.indexSpacesSpaceIdSitesGet(body);
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

### Return type

[**Array&lt;StudySiteProtocolVersionRelationship&gt;**](StudySiteProtocolVersionRelationship.md)

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

