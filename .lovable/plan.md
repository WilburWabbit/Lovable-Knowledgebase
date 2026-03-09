

## Plan: Auto-Import OpenAPI Spec Files

### What it does
Users upload an OpenAPI spec file (JSON or YAML) anywhere in the app, and the system automatically parses it to create a collection and all its endpoints — no manual data entry needed. The uploaded file is also stored as a document attachment.

### Architecture

**Edge Function: `parse-openapi`**
- Receives the raw file content (text) and format (json/yaml)
- Uses Lovable AI (gemini-3-flash-preview) to extract structured data via tool calling:
  - Collection: name, description, base_url, version
  - Endpoints: method, path, summary, description, parameters, request_body, response_example, tags
- Returns the structured result to the client
- Reason for AI: OpenAPI specs are complex and varied (v2/v3, YAML/JSON, with `$ref` resolution, HTML in descriptions, etc.). AI handles all edge cases robustly without needing a full OpenAPI parser library.

**Frontend: `ImportSpecButton` component**
- A prominent "Import Spec" button on the Welcome view and sidebar
- Accepts `.json`, `.yaml`, `.yml` files
- On upload:
  1. Reads file content as text
  2. Calls `parse-openapi` edge function
  3. Creates the collection in DB via existing `useAddCollection`
  4. Creates all endpoints via existing `useAddEndpoint`
  5. Stores the original file in the `endpoint-docs` storage bucket
  6. Shows progress toast with endpoint count

**Changes needed:**
1. Create `supabase/functions/parse-openapi/index.ts` — edge function using Lovable AI with tool calling to extract structured OpenAPI data
2. Update `supabase/config.toml` — add function config with `verify_jwt = false`
3. Create `src/components/ImportSpecButton.tsx` — upload button + parsing orchestration
4. Update `src/components/WelcomeView.tsx` — add Import button alongside existing New Collection
5. Update `src/components/AppSidebar.tsx` — add Import option in sidebar header

### Edge Function Design

The function sends the file content to Lovable AI with a system prompt instructing it to extract OpenAPI spec structure, using tool calling with a `parse_openapi_spec` tool definition that returns:
```json
{
  "collection": { "name", "description", "base_url", "version" },
  "endpoints": [{ "method", "path", "summary", "description", "parameters", "request_body", "response_example", "tags" }]
}
```

This avoids needing a YAML parser in Deno and handles all OpenAPI versions and edge cases.

