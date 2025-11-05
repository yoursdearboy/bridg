# PersonSubjectApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**indexPersonsPersonIdSubjectGet**](PersonSubjectApi.md#indexpersonspersonidsubjectget) | **GET** /persons/{person_id}/subject | Index |



## indexPersonsPersonIdSubjectGet

> Array&lt;PersonStudySubject&gt; indexPersonsPersonIdSubjectGet(personId)

Index

### Example

```ts
import {
  Configuration,
  PersonSubjectApi,
} from '';
import type { IndexPersonsPersonIdSubjectGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonSubjectApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexPersonsPersonIdSubjectGetRequest;

  try {
    const data = await api.indexPersonsPersonIdSubjectGet(body);
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
| **personId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;PersonStudySubject&gt;**](PersonStudySubject.md)

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

