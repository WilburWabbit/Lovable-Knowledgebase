import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, format } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an OpenAPI specification parser. You will receive the raw content of an API specification file (OpenAPI v2/Swagger or v3, in JSON or YAML format). Extract the structured data by calling the parse_openapi_spec tool. 

Rules:
- Extract ALL endpoints/operations from the spec
- For parameters, include query, path, and header parameters
- For request_body, provide a JSON string example if available, otherwise null
- For response_example, provide the 200/201 response example as a JSON string, or a reasonable example based on the schema
- Use the servers/host/basePath to determine the base_url
- Tags should come from the operation's tags array
- method must be uppercase: GET, POST, PUT, DELETE, PATCH
- description should be a clean text summary (strip HTML if present)
- If version is not found, default to "1.0.0"`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Parse this ${format} OpenAPI spec:\n\n${content}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "parse_openapi_spec",
              description: "Return the parsed OpenAPI specification as structured data",
              parameters: {
                type: "object",
                properties: {
                  collection: {
                    type: "object",
                    properties: {
                      name: { type: "string", description: "API name/title" },
                      description: { type: "string", description: "API description" },
                      base_url: { type: "string", description: "Base URL from servers/host" },
                      version: { type: "string", description: "API version" },
                    },
                    required: ["name", "description", "base_url", "version"],
                    additionalProperties: false,
                  },
                  endpoints: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE", "PATCH"] },
                        path: { type: "string" },
                        summary: { type: "string" },
                        description: { type: "string" },
                        parameters: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              type: { type: "string" },
                              required: { type: "boolean" },
                              description: { type: "string" },
                            },
                            required: ["name", "type", "required", "description"],
                            additionalProperties: false,
                          },
                        },
                        request_body: { type: "string", description: "JSON string example or null" },
                        response_example: { type: "string", description: "JSON string of example response" },
                        tags: { type: "array", items: { type: "string" } },
                      },
                      required: ["method", "path", "summary", "description", "parameters", "tags", "response_example"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["collection", "endpoints"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "parse_openapi_spec" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const parsed = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("parse-openapi error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
