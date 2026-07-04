import { useEffect, useMemo, useState } from "react";
import "../styles/ModalSignup.css";
import { generateTicketPdf } from "../models/ticketGenerator.js";

export default function ModalSignup({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [ticketUrl, setTicketUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (ticketUrl) {
        URL.revokeObjectURL(ticketUrl);
      }
    };
  }, [ticketUrl]);

  const canSubmit = useMemo(
    () => form.name.trim() && form.email.trim() && form.phone.trim(),
    [form],
  );

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || isLoading) return;
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 250));
    const url = generateTicketPdf(form);
    setTicketUrl(url);
    setForm({ name: "", email: "", phone: "" });

    // Try to validate the generated blob and open in a new tab as a fallback.
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      if (blob.type !== "application/pdf") {
        // non-PDF — open in new tab anyway for user to inspect
        console.warn("Generated ticket is not a PDF:", blob.type);
      }
      // Open preview in a new tab so user can view/save immediately
      window.open(url, "_blank");
    } catch (err) {
      console.error("Error validating/opening ticket:", err);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <button className="modal__close" type="button" onClick={onClose}>
          ×
        </button>
        <h2>Signup for event</h2>
        <p>Reserve your ticket now and print it for entry.</p>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label>
            Name
            <input value={form.name} onChange={handleChange("name")} required />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
          </label>
          <label>
            Phone Number
            <input
              value={form.phone}
              onChange={handleChange("phone")}
              required
            />
          </label>
          <button
            className="modal__submit"
            type="submit"
            disabled={!canSubmit || isLoading}
          >
            {isLoading ?
              <span className="modal__spinner" />
            : null}
            {isLoading ? "Generating..." : "Generate ticket"}
          </button>
        </form>
        {ticketUrl && (
          <div className="modal__ticket">
            <p>Your ticket is ready.</p>
            <div className="modal__preview">
              <object
                data={ticketUrl}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Preview not available.{" "}
                  <a href={ticketUrl} target="_blank" rel="noreferrer">
                    Open in new tab
                  </a>
                </p>
              </object>
            </div>
            <div style={{ marginTop: 12 }}>
              <a
                className="modal__download"
                href={ticketUrl}
                download="campus-ceo-ticket.pdf"
              >
                Download Ticket
              </a>
              <button
                type="button"
                onClick={() => window.open(ticketUrl, "_blank")}
                style={{ marginLeft: 12 }}
              >
                Open in new tab
              </button>
            </div>
            <small>Print or save the PDF for entry.</small>
          </div>
        )}
      </div>
    </div>
  );
}
