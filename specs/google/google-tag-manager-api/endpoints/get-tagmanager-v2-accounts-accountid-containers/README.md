# GET /tagmanager/v2/accounts/{accountId}/containers

Lists all Containers that belongs to a GTM Account.

Lists all Containers that belongs to a GTM Account.

## Parameters

- **accountId** (string) *required* — Google Tag Manager account ID.
- **pageToken** (string) — Continuation token for pagination.

## Request Body

```
null
```

## Response Example

```
{"container": [], "nextPageToken": "string"}
```

Tags: v2.accounts.containers
