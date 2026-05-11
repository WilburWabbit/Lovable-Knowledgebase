# POST /tagmanager/v2/accounts/{accountId}/containers

Creates a Container.

Creates a Container.

## Parameters

- **accountId** (string) *required* — Google Tag Manager account ID.

## Request Body

```
{"name": "My Container", "usageContext": ["web"]}
```

## Response Example

```
{"accountId": "string", "containerId": "string", "name": "string"}
```

Tags: v2.accounts.containers
