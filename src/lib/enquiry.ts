export type Enquiry = { name: string; email: string; company: string; website: string; message: string; websiteConfirmation: string };
export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(input: unknown): { data: Enquiry; errors: FieldErrors } {
  const raw = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const get = (key: keyof Enquiry) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const data: Enquiry = { name: get("name"), email: get("email"), company: get("company"), website: get("website"), message: get("message"), websiteConfirmation: get("websiteConfirmation") };
  const errors: FieldErrors = {};
  if (data.name.length < 2 || data.name.length > 120) errors.name = "Enter your full name (2–120 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) errors.email = "Enter a valid email address.";
  if (data.company.length > 160) errors.company = "Keep the company name under 160 characters.";
  if (data.website) {
    try {
      const url = new URL(data.website);
      if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || data.website.length > 2048 || url.username || url.password) throw new Error("Invalid website");
    } catch { errors.website = "Enter a full website address, starting with https://."; }
  }
  if (data.message.length < 10 || data.message.length > 5000) errors.message = "Tell us a little more (10–5,000 characters).";
  if (data.websiteConfirmation) errors.websiteConfirmation = "Unable to submit this enquiry.";
  return { data, errors };
}
