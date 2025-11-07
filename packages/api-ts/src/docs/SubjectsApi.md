# SubjectsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSpacesSpaceIdSubjectsPost**](SubjectsApi.md#createspacesspaceidsubjectspost) | **POST** /spaces/{space_id}/subjects | Create |
| [**indexSpacesSpaceIdSubjectsGet**](SubjectsApi.md#indexspacesspaceidsubjectsget) | **GET** /spaces/{space_id}/subjects | Index |
| [**indexSpacesSpaceIdSubjectsSubjectIdActivityGet**](SubjectsApi.md#indexspacesspaceidsubjectssubjectidactivityget) | **GET** /spaces/{space_id}/subjects/{subject_id}/activity | Index |
| [**lookupSpacesSpaceIdSubjectsLookupPost**](SubjectsApi.md#lookupspacesspaceidsubjectslookuppost) | **POST** /spaces/{space_id}/subjects/lookup | Lookup |
| [**showSpacesSpaceIdSubjectsSubjectIdActivityAIdGet**](SubjectsApi.md#showspacesspaceidsubjectssubjectidactivityaidget) | **GET** /spaces/{space_id}/subjects/{subject_id}/activity/{a_id} | Show |
| [**showSpacesSpaceIdSubjectsSubjectIdGet**](SubjectsApi.md#showspacesspaceidsubjectssubjectidget) | **GET** /spaces/{space_id}/subjects/{subject_id} | Show |



## createSpacesSpaceIdSubjectsPost

> StudySubject createSpacesSpaceIdSubjectsPost(spaceId, newStudySubject)

Create

### Example

```ts
import {
  Configuration,
  SubjectsApi,
} from '';
import type { CreateSpacesSpaceIdSubjectsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubjectsApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // NewStudySubject
    newStudySubject: ...,
  } satisfies CreateSpacesSpaceIdSubjectsPostRequest;

  try {
    const data = await api.createSpacesSpaceIdSubjectsPost(body);
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
| **newStudySubject** | [NewStudySubject](NewStudySubject.md) |  | |

### Return type

[**StudySubject**](StudySubject.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful Response |  -  |
| **422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## indexSpacesSpaceIdSubjectsGet

> Array&lt;StudySubject&gt; indexSpacesSpaceIdSubjectsGet(spaceId)

Index

### Example

```ts
import {
  Configuration,
  SubjectsApi,
} from '';
import type { IndexSpacesSpaceIdSubjectsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubjectsApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexSpacesSpaceIdSubjectsGetRequest;

  try {
    const data = await api.indexSpacesSpaceIdSubjectsGet(body);
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

[**Array&lt;StudySubject&gt;**](StudySubject.md)

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


## indexSpacesSpaceIdSubjectsSubjectIdActivityGet

> Array&lt;PerformedActivity&gt; indexSpacesSpaceIdSubjectsSubjectIdActivityGet(spaceId, subjectId)

Index

### Example

```ts
import {
  Configuration,
  SubjectsApi,
} from '';
import type { IndexSpacesSpaceIdSubjectsSubjectIdActivityGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubjectsApi();

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


## lookupSpacesSpaceIdSubjectsLookupPost

> Array&lt;FoundStudySubject&gt; lookupSpacesSpaceIdSubjectsLookupPost(spaceId, lookupStudySubject)

Lookup

### Example

```ts
import {
  Configuration,
  SubjectsApi,
} from '';
import type { LookupSpacesSpaceIdSubjectsLookupPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubjectsApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // LookupStudySubject
    lookupStudySubject: ...,
  } satisfies LookupSpacesSpaceIdSubjectsLookupPostRequest;

  try {
    const data = await api.lookupSpacesSpaceIdSubjectsLookupPost(body);
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
| **lookupStudySubject** | [LookupStudySubject](LookupStudySubject.md) |  | |

### Return type

[**Array&lt;FoundStudySubject&gt;**](FoundStudySubject.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
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
  SubjectsApi,
} from '';
import type { ShowSpacesSpaceIdSubjectsSubjectIdActivityAIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubjectsApi();

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


## showSpacesSpaceIdSubjectsSubjectIdGet

> StudySubject showSpacesSpaceIdSubjectsSubjectIdGet(spaceId, subjectId)

Show

### Example

```ts
import {
  Configuration,
  SubjectsApi,
} from '';
import type { ShowSpacesSpaceIdSubjectsSubjectIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubjectsApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    subjectId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ShowSpacesSpaceIdSubjectsSubjectIdGetRequest;

  try {
    const data = await api.showSpacesSpaceIdSubjectsSubjectIdGet(body);
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

[**StudySubject**](StudySubject.md)

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

