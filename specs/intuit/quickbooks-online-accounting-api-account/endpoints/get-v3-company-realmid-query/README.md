# GET /v3/company/{realmId}/query

Query accounts using GET

Execute a QuickBooks SQL-like query selecting from `Account`.

Example:
  SELECT * FROM Account STARTPOSITION 1 MAXRESULTS 5


## Parameters

- **realmId** (string) *required* — QuickBooks company ID returned as `realmId` during OAuth authorisation.
- **minorversion** (integer) — Optional Intuit minor version. Intuit retires older minor versions over time, so pin only when you need specific behaviour.
- **query** (string) *required* — SQL-like QuickBooks query statement selecting from `Account`.

## Request Body

```
null
```

## Response Example

```
{
  "QueryResponse": {
    "Account": [
      {
        "Id": "94",
        "Name": "AR4",
        "AccountType": "Accounts Receivable"
      }
    ],
    "startPosition": 1,
    "maxResults": 5
  },
  "time": "2013-04-03T10:22:55.766Z"
}
```

Tags: Account
