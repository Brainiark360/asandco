"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { validateEnquiry, type Enquiry, type FieldErrors } from "../lib/enquiry";
import { Arrow } from "./Brand";

const fields = [
  { name: "name", label: "Full name", placeholder: "Your full name", type: "text", autocomplete: "name", required: true, maxLength: 120 },
  { name: "email", label: "Work email", placeholder: "you@company.com", type: "email", autocomplete: "email", required: true, maxLength: 254 },
  { name: "company", label: "Company", placeholder: "Your company name", type: "text", autocomplete: "organization", required: false, maxLength: 160 },
  { name: "website", label: "Website", placeholder: "https://yourwebsite.com", type: "url", autocomplete: "url", required: false, maxLength: 2048 },
] as const;

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  function clearError(name: keyof Enquiry) {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }
  function focusFirstError(nextErrors: FieldErrors) {
    const first = Object.keys(nextErrors)[0];
    const field = formRef.current?.elements.namedItem(first);
    if (field instanceof HTMLElement) field.focus();
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const { data, errors: nextErrors } = validateEnquiry(Object.fromEntries(new FormData(event.currentTarget)));
    setErrors(nextErrors);
    setStatus("");
    if (Object.keys(nextErrors).length) { focusFirstError(nextErrors); return; }
    setPending(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), signal: AbortSignal.timeout(12000) });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        if (result?.errors) { setErrors(result.errors); focusFirstError(result.errors); }
        throw new Error(typeof result?.message === "string" ? result.message : "We couldn’t send your enquiry. Please try again later. Your details are still here.");
      }
      router.push("/contact/thank-you");
    } catch (error) {
      setStatus(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "We couldn’t connect. Please try again. Your details are still here.");
    } finally { setPending(false); }
  }

  return <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Project enquiry" aria-busy={pending} aria-describedby="enquiry-privacy">
    {fields.map((field) => <div className="form-field" key={field.name}>
      <label htmlFor={"enquiry-" + field.name}>{field.label}{field.required ? <span aria-hidden="true"> *</span> : null}</label>
      <input id={"enquiry-" + field.name} name={field.name} type={field.type} autoComplete={field.autocomplete} required={field.required} placeholder={field.placeholder} maxLength={field.maxLength} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? "error-" + field.name : undefined} onChange={() => clearError(field.name)} />
      {errors[field.name] ? <p id={"error-" + field.name} className="field-error">{errors[field.name]}</p> : null}
    </div>)}
    <div className="form-field form-field--message">
      <label htmlFor="enquiry-message">What would you like to move forward?<span aria-hidden="true"> *</span></label>
      <textarea id="enquiry-message" name="message" placeholder="Tell us about your goals and the challenge." required minLength={10} maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "error-message" : undefined} onChange={() => clearError("message")} />
      {errors.message ? <p id="error-message" className="field-error">{errors.message}</p> : null}
    </div>
    <div className="form-honeypot" aria-hidden="true">
      <label htmlFor="enquiry-website-confirmation">Leave this field empty</label>
      <input id="enquiry-website-confirmation" name="websiteConfirmation" tabIndex={-1} autoComplete="off" />
    </div>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
    <button type="submit" className="button" disabled={pending}><span>{pending ? "Sending enquiry…" : "Send enquiry"}</span><Arrow light /></button>
    <p className="small-copy" id="enquiry-privacy">We’ll use your details to respond to your enquiry.</p>
    <noscript><p className="field-error">Please enable JavaScript to send this enquiry.</p></noscript>
  </form>;
}
