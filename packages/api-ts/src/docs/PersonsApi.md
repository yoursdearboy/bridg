# PersonsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPersonsPersonIdNamesPost**](PersonsApi.md#createpersonspersonidnamespost) | **POST** /persons/{person_id}/names | Create |
| [**createPersonsPersonIdPostalAddressesPost**](PersonsApi.md#createpersonspersonidpostaladdressespost) | **POST** /persons/{person_id}/postal_addresses | Create |
| [**createPersonsPersonIdTelecommunicationAddressesPost**](PersonsApi.md#createpersonspersonidtelecommunicationaddressespost) | **POST** /persons/{person_id}/telecommunication_addresses | Create |
| [**deletePersonsPersonIdNamesNameIdDelete**](PersonsApi.md#deletepersonspersonidnamesnameiddelete) | **DELETE** /persons/{person_id}/names/{name_id} | Delete |
| [**deletePersonsPersonIdPostalAddressesAddressIdDelete**](PersonsApi.md#deletepersonspersonidpostaladdressesaddressiddelete) | **DELETE** /persons/{person_id}/postal_addresses/{address_id} | Delete |
| [**deletePersonsPersonIdTelecommunicationAddressesAddressIdDelete**](PersonsApi.md#deletepersonspersonidtelecommunicationaddressesaddressiddelete) | **DELETE** /persons/{person_id}/telecommunication_addresses/{address_id} | Delete |
| [**indexPersonsPersonIdNamesGet**](PersonsApi.md#indexpersonspersonidnamesget) | **GET** /persons/{person_id}/names | Index |
| [**indexPersonsPersonIdPostalAddressesGet**](PersonsApi.md#indexpersonspersonidpostaladdressesget) | **GET** /persons/{person_id}/postal_addresses | Index |
| [**indexPersonsPersonIdSubjectGet**](PersonsApi.md#indexpersonspersonidsubjectget) | **GET** /persons/{person_id}/subject | Index |
| [**indexPersonsPersonIdTelecommunicationAddressesGet**](PersonsApi.md#indexpersonspersonidtelecommunicationaddressesget) | **GET** /persons/{person_id}/telecommunication_addresses | Index |
| [**showPersonsPersonIdGet**](PersonsApi.md#showpersonspersonidget) | **GET** /persons/{person_id} | Show |
| [**updatePersonsPersonIdNamesNameIdPatch**](PersonsApi.md#updatepersonspersonidnamesnameidpatch) | **PATCH** /persons/{person_id}/names/{name_id} | Update |
| [**updatePersonsPersonIdPatch**](PersonsApi.md#updatepersonspersonidpatch) | **PATCH** /persons/{person_id} | Update |
| [**updatePersonsPersonIdPostalAddressesAddressIdPatch**](PersonsApi.md#updatepersonspersonidpostaladdressesaddressidpatch) | **PATCH** /persons/{person_id}/postal_addresses/{address_id} | Update |
| [**updatePersonsPersonIdTelecommunicationAddressesAddressIdPatch**](PersonsApi.md#updatepersonspersonidtelecommunicationaddressesaddressidpatch) | **PATCH** /persons/{person_id}/telecommunication_addresses/{address_id} | Update |



## createPersonsPersonIdNamesPost

> EntityName createPersonsPersonIdNamesPost(personId, entityNameData)

Create

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { CreatePersonsPersonIdNamesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // EntityNameData
    entityNameData: ...,
  } satisfies CreatePersonsPersonIdNamesPostRequest;

  try {
    const data = await api.createPersonsPersonIdNamesPost(body);
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
| **entityNameData** | [EntityNameData](EntityNameData.md) |  | |

### Return type

[**EntityName**](EntityName.md)

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


## createPersonsPersonIdPostalAddressesPost

> PostalAddress createPersonsPersonIdPostalAddressesPost(personId, postalAddressData)

Create

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { CreatePersonsPersonIdPostalAddressesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // PostalAddressData
    postalAddressData: ...,
  } satisfies CreatePersonsPersonIdPostalAddressesPostRequest;

  try {
    const data = await api.createPersonsPersonIdPostalAddressesPost(body);
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
| **postalAddressData** | [PostalAddressData](PostalAddressData.md) |  | |

### Return type

[**PostalAddress**](PostalAddress.md)

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


## createPersonsPersonIdTelecommunicationAddressesPost

> TelecommunicationAddress createPersonsPersonIdTelecommunicationAddressesPost(personId, telecommunicationAddressData)

Create

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { CreatePersonsPersonIdTelecommunicationAddressesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // TelecommunicationAddressData
    telecommunicationAddressData: ...,
  } satisfies CreatePersonsPersonIdTelecommunicationAddressesPostRequest;

  try {
    const data = await api.createPersonsPersonIdTelecommunicationAddressesPost(body);
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
| **telecommunicationAddressData** | [TelecommunicationAddressData](TelecommunicationAddressData.md) |  | |

### Return type

[**TelecommunicationAddress**](TelecommunicationAddress.md)

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


## deletePersonsPersonIdNamesNameIdDelete

> any deletePersonsPersonIdNamesNameIdDelete(personId, nameId)

Delete

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { DeletePersonsPersonIdNamesNameIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    nameId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeletePersonsPersonIdNamesNameIdDeleteRequest;

  try {
    const data = await api.deletePersonsPersonIdNamesNameIdDelete(body);
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
| **nameId** | `string` |  | [Defaults to `undefined`] |

### Return type

**any**

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


## deletePersonsPersonIdPostalAddressesAddressIdDelete

> any deletePersonsPersonIdPostalAddressesAddressIdDelete(personId, addressId)

Delete

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { DeletePersonsPersonIdPostalAddressesAddressIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    addressId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeletePersonsPersonIdPostalAddressesAddressIdDeleteRequest;

  try {
    const data = await api.deletePersonsPersonIdPostalAddressesAddressIdDelete(body);
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
| **addressId** | `string` |  | [Defaults to `undefined`] |

### Return type

**any**

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


## deletePersonsPersonIdTelecommunicationAddressesAddressIdDelete

> any deletePersonsPersonIdTelecommunicationAddressesAddressIdDelete(personId, addressId)

Delete

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { DeletePersonsPersonIdTelecommunicationAddressesAddressIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    addressId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeletePersonsPersonIdTelecommunicationAddressesAddressIdDeleteRequest;

  try {
    const data = await api.deletePersonsPersonIdTelecommunicationAddressesAddressIdDelete(body);
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
| **addressId** | `string` |  | [Defaults to `undefined`] |

### Return type

**any**

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


## indexPersonsPersonIdNamesGet

> Array&lt;EntityName&gt; indexPersonsPersonIdNamesGet(personId)

Index

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { IndexPersonsPersonIdNamesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexPersonsPersonIdNamesGetRequest;

  try {
    const data = await api.indexPersonsPersonIdNamesGet(body);
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

[**Array&lt;EntityName&gt;**](EntityName.md)

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


## indexPersonsPersonIdPostalAddressesGet

> Array&lt;PostalAddress&gt; indexPersonsPersonIdPostalAddressesGet(personId)

Index

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { IndexPersonsPersonIdPostalAddressesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexPersonsPersonIdPostalAddressesGetRequest;

  try {
    const data = await api.indexPersonsPersonIdPostalAddressesGet(body);
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

[**Array&lt;PostalAddress&gt;**](PostalAddress.md)

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


## indexPersonsPersonIdSubjectGet

> Array&lt;PersonStudySubject&gt; indexPersonsPersonIdSubjectGet(personId)

Index

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { IndexPersonsPersonIdSubjectGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

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


## indexPersonsPersonIdTelecommunicationAddressesGet

> Array&lt;TelecommunicationAddress&gt; indexPersonsPersonIdTelecommunicationAddressesGet(personId)

Index

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { IndexPersonsPersonIdTelecommunicationAddressesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies IndexPersonsPersonIdTelecommunicationAddressesGetRequest;

  try {
    const data = await api.indexPersonsPersonIdTelecommunicationAddressesGet(body);
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

[**Array&lt;TelecommunicationAddress&gt;**](TelecommunicationAddress.md)

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


## showPersonsPersonIdGet

> Person showPersonsPersonIdGet(personId)

Show

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { ShowPersonsPersonIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ShowPersonsPersonIdGetRequest;

  try {
    const data = await api.showPersonsPersonIdGet(body);
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

[**Person**](Person.md)

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


## updatePersonsPersonIdNamesNameIdPatch

> EntityName updatePersonsPersonIdNamesNameIdPatch(personId, nameId, entityNameData)

Update

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { UpdatePersonsPersonIdNamesNameIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    nameId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // EntityNameData
    entityNameData: ...,
  } satisfies UpdatePersonsPersonIdNamesNameIdPatchRequest;

  try {
    const data = await api.updatePersonsPersonIdNamesNameIdPatch(body);
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
| **nameId** | `string` |  | [Defaults to `undefined`] |
| **entityNameData** | [EntityNameData](EntityNameData.md) |  | |

### Return type

[**EntityName**](EntityName.md)

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


## updatePersonsPersonIdPatch

> Person updatePersonsPersonIdPatch(personId, personData)

Update

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { UpdatePersonsPersonIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // PersonData
    personData: ...,
  } satisfies UpdatePersonsPersonIdPatchRequest;

  try {
    const data = await api.updatePersonsPersonIdPatch(body);
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
| **personData** | [PersonData](PersonData.md) |  | |

### Return type

[**Person**](Person.md)

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


## updatePersonsPersonIdPostalAddressesAddressIdPatch

> PostalAddress updatePersonsPersonIdPostalAddressesAddressIdPatch(personId, addressId, postalAddressData)

Update

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { UpdatePersonsPersonIdPostalAddressesAddressIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    addressId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // PostalAddressData
    postalAddressData: ...,
  } satisfies UpdatePersonsPersonIdPostalAddressesAddressIdPatchRequest;

  try {
    const data = await api.updatePersonsPersonIdPostalAddressesAddressIdPatch(body);
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
| **addressId** | `string` |  | [Defaults to `undefined`] |
| **postalAddressData** | [PostalAddressData](PostalAddressData.md) |  | |

### Return type

[**PostalAddress**](PostalAddress.md)

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


## updatePersonsPersonIdTelecommunicationAddressesAddressIdPatch

> TelecommunicationAddress updatePersonsPersonIdTelecommunicationAddressesAddressIdPatch(personId, addressId, telecommunicationAddressData)

Update

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '';
import type { UpdatePersonsPersonIdTelecommunicationAddressesAddressIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PersonsApi();

  const body = {
    // string
    personId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    addressId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // TelecommunicationAddressData
    telecommunicationAddressData: ...,
  } satisfies UpdatePersonsPersonIdTelecommunicationAddressesAddressIdPatchRequest;

  try {
    const data = await api.updatePersonsPersonIdTelecommunicationAddressesAddressIdPatch(body);
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
| **addressId** | `string` |  | [Defaults to `undefined`] |
| **telecommunicationAddressData** | [TelecommunicationAddressData](TelecommunicationAddressData.md) |  | |

### Return type

[**TelecommunicationAddress**](TelecommunicationAddress.md)

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

