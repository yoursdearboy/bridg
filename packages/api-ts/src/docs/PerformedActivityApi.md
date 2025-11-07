# PerformedActivityApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**indexSpacesSpaceIdSubjectsSubjectIdActivityGet**](PerformedActivityApi.md#indexspacesspaceidsubjectssubjectidactivityget) | **GET** /spaces/{space_id}/subjects/{subject_id}/activity | Index |
| [**showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet**](PerformedActivityApi.md#showspacesspaceidsubjectssubjectidactivityaidget) | **GET** /spaces/{space_id}/subjects/{subject_id}/activity/{a_id} | Show |



## indexSpacesSpaceIdSubjectsSubjectIdActivityGet

> Array&lt;PerformedActivity&gt; indexSpacesSpaceIdSubjectsSubjectIdActivityGet(spaceId, subjectId)

Index

### Example

```ts
import {
  Configuration,
  PerformedActivityApi,
} from '';
import type { IndexSpacesSpaceIdSubjectsSubjectIdActivityGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PerformedActivityApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    subjectId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexSpacesSpaceIdSubjectsSubjectIdActivityGetRequest;

  try {
    const data = await api.indexSpacesSpaceIdSubjectsSubjectIdActivityGet(body);
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
| **subjectId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;PerformedActivity&gt;**](PerformedActivity.md)

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


## showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet

> ResponseShowPerformedActivityAIdGet showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet(spaceId, subjectId, aId, result)

Show

### Example

```ts
import {
  Configuration,
  PerformedActivityApi,
} from '';
import type { ShowSpacesSpaceIdSubjectsSubjectIdActivityAIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PerformedActivityApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    subjectId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    aId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean (optional)
    result: true,
  } satisfies ShowSpacesSpaceIdSubjectsSubjectIdActivityAIdGetRequest;

  try {
    const data = await api.showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet(body);
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
| **subjectId** | `string` |  | [Defaults to `undefined`] |
| **aId** | `string` |  | [Defaults to `undefined`] |
| **result** | `boolean` |  | [Optional] [Defaults to `false`] |

### Return type

[**ResponseShowPerformedActivityAIdGet**](ResponseShowPerformedActivityAIdGet.md)

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

