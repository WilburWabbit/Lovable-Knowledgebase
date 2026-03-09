import { HttpMethod } from "@/data/sampleSpecs";

const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-method-get/15 text-method-get",
  POST: "bg-method-post/15 text-method-post",
  PUT: "bg-method-put/15 text-method-put",
  DELETE: "bg-method-delete/15 text-method-delete",
  PATCH: "bg-method-patch/15 text-method-patch",
};

export function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold tracking-wide ${methodStyles[method]}`}
    >
      {method}
    </span>
  );
}
