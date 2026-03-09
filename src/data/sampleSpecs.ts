export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
  description: string;
  parameters: ApiParameter[];
  requestBody?: string;
  responseExample: string;
  tags: string[];
}

export interface ApiCollection {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  version: string;
  parentId?: string | null;
  endpoints: ApiEndpoint[];
  children?: ApiCollection[];
}

export const sampleCollections: ApiCollection[] = [
  {
    id: "users-api",
    name: "Users API",
    description: "Core user management and authentication endpoints",
    baseUrl: "https://api.example.com/v2",
    version: "2.4.1",
    endpoints: [
      {
        id: "get-users",
        method: "GET",
        path: "/users",
        summary: "List all users",
        description: "Returns a paginated list of users. Supports filtering by role, status, and creation date.",
        parameters: [
          { name: "page", type: "integer", required: false, description: "Page number (default: 1)" },
          { name: "limit", type: "integer", required: false, description: "Items per page (default: 20, max: 100)" },
          { name: "role", type: "string", required: false, description: "Filter by role: admin, editor, viewer" },
          { name: "status", type: "string", required: false, description: "Filter by status: active, inactive, suspended" },
        ],
        responseExample: JSON.stringify({ data: [{ id: "usr_01", name: "Alice Chen", email: "alice@example.com", role: "admin", status: "active" }], meta: { page: 1, total: 142 } }, null, 2),
        tags: ["users", "list"],
      },
      {
        id: "create-user",
        method: "POST",
        path: "/users",
        summary: "Create a user",
        description: "Creates a new user account and sends a welcome email. Requires admin privileges.",
        parameters: [],
        requestBody: JSON.stringify({ name: "string (required)", email: "string (required)", role: "string (optional, default: viewer)" }, null, 2),
        responseExample: JSON.stringify({ id: "usr_02", name: "Bob Lee", email: "bob@example.com", role: "viewer", created_at: "2026-03-09T12:00:00Z" }, null, 2),
        tags: ["users", "create"],
      },
      {
        id: "get-user",
        method: "GET",
        path: "/users/:id",
        summary: "Get user by ID",
        description: "Retrieves a single user by their unique identifier.",
        parameters: [
          { name: "id", type: "string", required: true, description: "The user's unique identifier" },
        ],
        responseExample: JSON.stringify({ id: "usr_01", name: "Alice Chen", email: "alice@example.com", role: "admin", status: "active", created_at: "2025-01-15T08:30:00Z" }, null, 2),
        tags: ["users", "detail"],
      },
      {
        id: "update-user",
        method: "PUT",
        path: "/users/:id",
        summary: "Update a user",
        description: "Updates user profile fields. Partial updates supported.",
        parameters: [
          { name: "id", type: "string", required: true, description: "The user's unique identifier" },
        ],
        requestBody: JSON.stringify({ name: "string (optional)", role: "string (optional)" }, null, 2),
        responseExample: JSON.stringify({ id: "usr_01", name: "Alice Chen-Smith", role: "admin", updated_at: "2026-03-09T14:00:00Z" }, null, 2),
        tags: ["users", "update"],
      },
      {
        id: "delete-user",
        method: "DELETE",
        path: "/users/:id",
        summary: "Delete a user",
        description: "Permanently deletes a user account. This action cannot be undone.",
        parameters: [
          { name: "id", type: "string", required: true, description: "The user's unique identifier" },
        ],
        responseExample: JSON.stringify({ message: "User deleted successfully" }, null, 2),
        tags: ["users", "delete"],
      },
    ],
  },
  {
    id: "payments-api",
    name: "Payments API",
    description: "Payment processing and transaction management",
    baseUrl: "https://api.example.com/v1",
    version: "1.8.0",
    endpoints: [
      {
        id: "create-charge",
        method: "POST",
        path: "/charges",
        summary: "Create a charge",
        description: "Creates a new payment charge. Supports multiple currencies and payment methods.",
        parameters: [],
        requestBody: JSON.stringify({ amount: "integer (required, in cents)", currency: "string (required, ISO 4217)", source: "string (required, payment method ID)", description: "string (optional)" }, null, 2),
        responseExample: JSON.stringify({ id: "ch_01", amount: 2500, currency: "usd", status: "succeeded", created: "2026-03-09T10:00:00Z" }, null, 2),
        tags: ["payments", "charges"],
      },
      {
        id: "list-charges",
        method: "GET",
        path: "/charges",
        summary: "List charges",
        description: "Returns a paginated list of charges with optional date range filtering.",
        parameters: [
          { name: "from", type: "string", required: false, description: "Start date (ISO 8601)" },
          { name: "to", type: "string", required: false, description: "End date (ISO 8601)" },
          { name: "status", type: "string", required: false, description: "Filter: succeeded, pending, failed" },
        ],
        responseExample: JSON.stringify({ data: [{ id: "ch_01", amount: 2500, currency: "usd", status: "succeeded" }], has_more: true }, null, 2),
        tags: ["payments", "list"],
      },
      {
        id: "refund-charge",
        method: "POST",
        path: "/charges/:id/refund",
        summary: "Refund a charge",
        description: "Issues a full or partial refund for a completed charge.",
        parameters: [
          { name: "id", type: "string", required: true, description: "Charge identifier" },
        ],
        requestBody: JSON.stringify({ amount: "integer (optional, partial refund in cents)", reason: "string (optional)" }, null, 2),
        responseExample: JSON.stringify({ id: "rf_01", charge: "ch_01", amount: 2500, status: "succeeded" }, null, 2),
        tags: ["payments", "refunds"],
      },
    ],
  },
  {
    id: "notifications-api",
    name: "Notifications API",
    description: "Push notifications, email, and in-app messaging",
    baseUrl: "https://api.example.com/v1",
    version: "1.2.3",
    endpoints: [
      {
        id: "send-notification",
        method: "POST",
        path: "/notifications",
        summary: "Send a notification",
        description: "Sends a notification via the specified channel (push, email, or in-app).",
        parameters: [],
        requestBody: JSON.stringify({ user_id: "string (required)", channel: "push | email | in_app", title: "string (required)", body: "string (required)" }, null, 2),
        responseExample: JSON.stringify({ id: "notif_01", status: "delivered", channel: "push", sent_at: "2026-03-09T11:00:00Z" }, null, 2),
        tags: ["notifications", "send"],
      },
      {
        id: "list-notifications",
        method: "GET",
        path: "/notifications",
        summary: "List notifications",
        description: "Retrieves notification history for the authenticated user.",
        parameters: [
          { name: "unread", type: "boolean", required: false, description: "Filter unread only" },
          { name: "channel", type: "string", required: false, description: "Filter by channel" },
        ],
        responseExample: JSON.stringify({ data: [{ id: "notif_01", title: "Welcome!", read: false, channel: "in_app" }], unread_count: 3 }, null, 2),
        tags: ["notifications", "list"],
      },
      {
        id: "mark-read",
        method: "PATCH",
        path: "/notifications/:id/read",
        summary: "Mark as read",
        description: "Marks a specific notification as read.",
        parameters: [
          { name: "id", type: "string", required: true, description: "Notification ID" },
        ],
        responseExample: JSON.stringify({ id: "notif_01", read: true, read_at: "2026-03-09T12:00:00Z" }, null, 2),
        tags: ["notifications", "update"],
      },
    ],
  },
];
