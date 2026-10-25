import test from "node:test";
import assert from "node:assert/strict";
import { loadTypeScript } from "./helpers/load-typescript.mjs";
const { validateEnquiry } = loadTypeScript("../../src/lib/enquiry.ts");

const valid = { name: "Test Person", email: "person@example.com", company: "", website: "", message: "A test project enquiry.", websiteConfirmation: "" };

test("accepts a complete enquiry and trims whitespace", () => {
  const result = validateEnquiry({ ...valid, name: "  Test Person  ", website: "https://example.com" });
  assert.equal(Object.keys(result.errors).length, 0);
  assert.equal(result.data.name, "Test Person");
});
test("rejects missing required fields and non-object bodies", () => {
  for (const input of [null, [], "", {}, { name: 42 }]) {
    const { errors } = validateEnquiry(input);
    assert.ok(errors.name && errors.email && errors.message);
  }
});
test("rejects invalid email, unsupported websites and honeypot", () => {
  assert.ok(validateEnquiry({ ...valid, email: "not-an-email" }).errors.email);
  for (const website of ["javascript:alert(1)", "example.com", "ftp://example.com", "https://person:secret@example.com"]) {
    assert.ok(validateEnquiry({ ...valid, website }).errors.website);
  }
  assert.ok(validateEnquiry({ ...valid, websiteConfirmation: "spam" }).errors.websiteConfirmation);
});
test("enforces lengths while keeping optional fields optional", () => {
  assert.equal(Object.keys(validateEnquiry(valid).errors).length, 0);
  assert.ok(validateEnquiry({ ...valid, name: "a".repeat(121) }).errors.name);
  assert.ok(validateEnquiry({ ...valid, company: "a".repeat(161) }).errors.company);
  assert.ok(validateEnquiry({ ...valid, message: "a".repeat(5001) }).errors.message);
});
