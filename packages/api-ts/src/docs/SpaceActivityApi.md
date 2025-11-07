# SpaceActivityApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**indexSpacesSpaceIdActivityGet**](SpaceActivityApi.md#indexspacesspaceidactivityget) | **GET** /spaces/{space_id}/activity | Index |
| [**indexSpacesSpaceIdActivitySaIdResultGet**](SpaceActivityApi.md#indexspacesspaceidactivitysaidresultget) | **GET** /spaces/{space_id}/activity/{sa_id}/result | Index |
| [**showSpacesSpaceIdActivitySaIdGet**](SpaceActivityApi.md#showspacesspaceidactivitysaidget) | **GET** /spaces/{space_id}/activity/{sa_id} | Show |



## indexSpacesSpaceIdActivityGet

> Array&lt;StudyActivity&gt; indexSpacesSpaceIdActivityGet(spaceId)

Index

### Example

```ts
import {
  Configuration,
  SpaceActivityApi,
} from '';
import type { IndexSpacesSpaceIdActivityGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SpaceActivityApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexSpacesSpaceIdActivityGetRequest;

  try {
    const data = await api.indexSpacesSpaceIdActivityGet(body);
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

[**Array&lt;StudyActivity&gt;**](StudyActivity.md)

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


## indexSpacesSpaceIdActivitySaIdResultGet

> Array&lt;DefinedObservationResult&gt; indexSpacesSpaceIdActivitySaIdResultGet(spaceId, saId)

Index

### Example

```ts
import {
  Configuration,
  SpaceActivityApi,
} from '';
import type { IndexSpacesSpaceIdActivitySaIdResultGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SpaceActivityApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    saId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexSpacesSpaceIdActivitySaIdResultGetRequest;

  try {
    const data = await api.indexSpacesSpaceIdActivitySaIdResultGet(body);
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
| **saId** | `string` |  | [Defaults to `undefined`] |

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


## showSpacesSpaceIdActivitySaIdGet

> StudyActivity showSpacesSpaceIdActivitySaIdGet(spaceId, saId)

Show

### Example

```ts
import {
  Configuration,
  SpaceActivityApi,
} from '';
import type { ShowSpacesSpaceIdActivitySaIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SpaceActivityApi();

  const body = {
    // string
    spaceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    saId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ShowSpacesSpaceIdActivitySaIdGetRequest;

  try {
    const data = await api.showSpacesSpaceIdActivitySaIdGet(body);
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
| **saId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**StudyActivity**](StudyActivity.md)

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

