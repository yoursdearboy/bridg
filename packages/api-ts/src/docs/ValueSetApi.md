# ValueSetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**expandCodeSystemCodeSystemExpandGet**](ValueSetApi.md#expandcodesystemcodesystemexpandget) | **GET** /code_system/{code_system}/$expand | Expand |



## expandCodeSystemCodeSystemExpandGet

> Array&lt;ConceptDescriptor&gt; expandCodeSystemCodeSystemExpandGet(codeSystem)

Expand

### Example

```ts
import {
  Configuration,
  ValueSetApi,
} from '';
import type { ExpandCodeSystemCodeSystemExpandGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ValueSetApi();

  const body = {
    // string
    codeSystem: codeSystem_example,
  } satisfies ExpandCodeSystemCodeSystemExpandGetRequest;

  try {
    const data = await api.expandCodeSystemCodeSystemExpandGet(body);
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
| **codeSystem** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;ConceptDescriptor&gt;**](ConceptDescriptor.md)

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

