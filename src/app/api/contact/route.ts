import { validateEnquiry } from "../../../lib/enquiry";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 16_384;
const unavailableMessage = "We couldn’t send your enquiry right now. Please try again later. Your details are still here.";

async function readPayload(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) throw new Error("Payload too large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_BYTES) { await reader.cancel(); throw new Error("Payload too large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ message: "This request could not be verified. Please reload and try again." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ message: "Use a JSON enquiry." }, { status: 415 });
  }
  let input: unknown;
  try { input = await readPayload(request); } catch (error) {
    const tooLarge = error instanceof Error && error.message === "Payload too large";
    return Response.json({ message: tooLarge ? "This enquiry is too long." : "We couldn’t read this enquiry. Please try again." }, { status: tooLarge ? 413 : 400 });
  }
  const { data, errors } = validateEnquiry(input);
  if (Object.keys(errors).length) return Response.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });
  const destination = process.env.CONTACT_WEBHOOK_URL;
  if (!destination) return Response.json({ message: unavailableMessage }, { status: 503 });
  try {
    const endpoint = new URL(destination);
    // Destination is server configuration, never user-supplied input.
    if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) throw new Error("Invalid delivery configuration");
    const response = await fetch(endpoint, {
      method: "POST",
      redirect: "error",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: "Bearer " + process.env.CONTACT_WEBHOOK_TOKEN } : {}),
      },
      body: JSON.stringify({ name: data.name, email: data.email, company: data.company, website: data.website, message: data.message, source: "alexander-stephen-website", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Delivery rejected");
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // Do not log the enquiry, destination, token, or other personal information.
    console.error("Contact enquiry delivery failed.");
    return Response.json({ message: unavailableMessage }, { status: 502 });
  }
}
