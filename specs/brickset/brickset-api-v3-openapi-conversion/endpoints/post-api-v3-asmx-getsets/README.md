# POST /api/v3.asmx/getSets

Retrieve sets matching search criteria.

Retrieves a list of sets, or more information about a particular one. params must be a JSON string shaped like GetSetsParamsObject. userHash is optional and is only used with user-specific filters such as owned or wanted.

## Parameters

_None_

## Request Body

```
{"apiKey": "string", "userHash": "string", "params": "{\"theme\":\"Space\"}"}
```

## Response Example

```
{"status": "success", "matches": 1, "sets": [{"setID": 1, "name": "Classic Space"}]}
```

Tags: Sets
