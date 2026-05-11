# POST /v3/company/{realmId}/account

Create or update an account

Create a new Account or update an existing one.

Create:
  - Omit `Id` and `SyncToken`
  - `Name` and `AccountType` are typically required

Update:
  - Include `Id` and `SyncToken`
  - Use `sparse: true` for sparse updates

Soft delete / deactivate:
  - Perform an update with `Active: false`


## Parameters

- **realmId** (string) *required* — QuickBooks company ID returned as `realmId` during OAuth authorisation.
- **minorversion** (integer) — Optional Intuit minor version. Intuit retires older minor versions over time, so pin only when you need specific behaviour.

## Request Body

```
{
  "AccountType": "Accounts Receivable",
  "Name": "AR4"
}
```

## Response Example

```
{
  "Account": {
    "Id": "94",
    "SyncToken": "3",
    "Name": "AR4",
    "AccountType": "Accounts Receivable",
    "Active": true,
    "FullyQualifiedName": "Parent:Account1:AR4",
    "MetaData": {
      "CreateTime": "2016-08-18T00:18:04-07:00",
      "LastUpdatedTime": "2016-08-18T00:18:04-07:00"
    }
  },
  "time": "2015-07-08T09:21:46.310-07:00"
}
```

Tags: Account
