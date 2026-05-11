# PUT /tagmanager/v2/accounts/{accountId}

Updates a GTM Account.

Updates a GTM Account.

## Parameters

- **accountId** (string) *required* — Google Tag Manager account ID.
- **fingerprint** (string) — Optional optimistic concurrency token. When supplied, it must match the stored fingerprint.

## Request Body

```
{"name": "Updated Account Name", "shareData": true}
```

## Response Example

```
{"accountId": "string", "name": "string", "path": "string", "fingerprint": "string", "shareData": true, "features": {"supportMultipleContainers": true}, "tagManagerUrl": "string"}
```

Tags: v2.accounts
