# GET /v3/company/{realmId}/account/{accountId}

Read an account by ID

Read an account by ID

## Parameters

- **realmId** (string) *required* — QuickBooks company ID returned as `realmId` during OAuth authorisation.
- **accountId** (string) *required* — Account identifier.
- **minorversion** (integer) — Optional Intuit minor version. Intuit retires older minor versions over time, so pin only when you need specific behaviour.

## Request Body

```
null
```

## Response Example

```
{
  "Account": {
    "Id": "1",
    "SyncToken": "0",
    "Name": "Services",
    "AccountType": "Revenue",
    "Active": true,
    "MetaData": {
      "CreateTime": "2016-08-18T00:18:04-07:00",
      "LastUpdatedTime": "2016-08-18T00:18:04-07:00"
    }
  },
  "time": "2015-07-08T09:21:46.310-07:00"
}
```

Tags: Account
