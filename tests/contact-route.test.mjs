import test from "node:test";
import assert from "node:assert/strict";
import { loadContactRoute } from "./helpers/load-typescript.mjs";

const enquiry = { name: "Test Person", email: "person@example.com", company: "", website: "", message: "A test enquiry for the website.", websiteConfirmation: "" };
const request = (body = enquiry, headers = {}) => new Request("http://localhost:3000/api/contact", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });

test("rejects invalid fields before attempting delivery", async () => {
  const { POST } = loadContactRoute();
  const response = await POST(request({}));
  assert.equal(response.status, 422);
  const body = await response.json();
  assert.ok(body.errors.name && body.errors.email && body.errors.message);
});
test("returns 503 rather than a false success when delivery is unconfigured", async () => {
  const response = await loadContactRoute().POST(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});
test("rejects cross-origin submissions", async () => {
  const { POST } = loadContactRoute();
  assert.equal((await POST(request(enquiry, { Origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request(enquiry, { "Sec-Fetch-Site": "cross-site" }))).status, 403);
});
test("rejects unsupported, malformed and oversized bodies", async () => {
  const { POST } = loadContactRoute();
  assert.equal((await POST(request(enquiry, { "Content-Type": "text/plain" }))).status, 415);
  const malformed = new Request("http://localhost:3000/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal((await POST(request({ ...enquiry, message: "a".repeat(17000) }))).status, 413);
});
test("acknowledges success only after the destination accepts the real payload", async () => {
  let sent;
  const { POST } = loadContactRoute({ CONTACT_WEBHOOK_URL: "https://delivery.example/enquiry", CONTACT_WEBHOOK_TOKEN: "test-only-token" }, async (url, init) => {
    sent = { url: url.toString(), ...init, body: JSON.parse(init.body) };
    return new Response(null, { status: 202 });
  });
  const response = await POST(request(enquiry, { Origin: "http://localhost:3000" }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(sent.url, "https://delivery.example/enquiry");
  assert.equal(sent.headers.Authorization, "Bearer test-only-token");
  assert.equal(sent.body.email, enquiry.email);
  assert.equal(sent.body.message, enquiry.message);
  assert.equal(sent.body.websiteConfirmation, undefined);
  assert.equal(sent.redirect, "error");
  assert.equal(sent.cache, "no-store");
});
test("does not claim success when delivery is rejected or unreachable", async () => {
  for (const mock of [async () => new Response(null, { status: 500 }), async () => { throw new Error("Network failure"); }]) {
    const response = await loadContactRoute({ CONTACT_WEBHOOK_URL: "https://delivery.example/enquiry" }, mock).POST(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, undefined);
  }
});
test("rejects unsafe destination configuration and honeypot submissions", async () => {
  assert.equal((await loadContactRoute({ CONTACT_WEBHOOK_URL: "http://delivery.example" }).POST(request())).status, 502);
  assert.equal((await loadContactRoute().POST(request({ ...enquiry, websiteConfirmation: "spam" }))).status, 422);
});
