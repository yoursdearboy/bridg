# DefinedActivityApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**showDefinedActivityAIdGet**](DefinedActivityApi.md#showdefinedactivityaidget) | **GET** /defined_activity/{a_id} | Show |



## showDefinedActivityAIdGet

> ResponseShowDefinedActivityAIdGet showDefinedActivityAIdGet(aId, result)

Show

### Example

```ts
import {
  Configuration,
  DefinedActivityApi,
} from '';
import type { ShowDefinedActivityAIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefinedActivityApi();

  const body = {
    // string
    aId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean (optional)
    result: true,
  } satisfies ShowDefinedActivityAIdGetRequest;

  try {
    const data = await api.showDefinedActivityAIdGet(body);
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
| **aId** | `string` |  | [Defaults to `undefined`] |
| **result** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**ResponseShowDefinedActivityAIdGet**](ResponseShowDefinedActivityAIdGet.md)

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

