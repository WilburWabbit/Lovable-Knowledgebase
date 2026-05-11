# POST /translate

Translates input text inot a given language.

Translates input text inot a given language.

## Parameters

_None_

## Request Body

```
{
  "from": "en-US",
  "text": [
    "string"
  ],
  "to": "fr-FR",
  "translationContext": "ITEM_TITLE"
}
```

## Response Example

```
{
  "translations": [
    {
      "from": "en-US",
      "originalText": "string",
      "to": "fr-FR",
      "translatedText": "string"
    }
  ]
}
```

Tags: language
