import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useSearch } from "wouter";
import Magnetic from "@/components/Magnetic";
import MatrixRain from "@/components/MatrixRain";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import Typewriter from "@/components/Typewriter";
import { contacts, responseTime, terminalCommand } from "@/data/contact";
import { site } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type Status = "idle" | "sending" | "sent" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = { name: "", email: "", message: "" };

/**
 * Optional endpoint for a form backend such as Formspree or Getform.
 * Set VITE_FORM_ENDPOINT in .env to enable it. Without it the form
 * gracefully falls back to opening the visitor's mail client.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

const fieldAccent: Record<keyof FormData, string> = {
  name: "var(--accent1)",
  email: "var(--accent2)",
  message: "var(--accent3)",
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (data.name.trim().length < 2) errors.name = "Please tell me your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "That email doesn't look right.";
  if (data.message.trim().length < 10)
    errors.message = "A few more words would help (10+ characters).";
  return errors;
}

export default function Contact() {
  useDocumentTitle("Contact");
  const search = useSearch();

  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<keyof FormData | null>(null);

  // Pre-fill the message when arriving from a service or pricing card
  // (?plan=Graphic%20Design or ?plan=Professional)
  useEffect(() => {
    const plan = new URLSearchParams(search).get("plan");
    if (plan) {
      setForm(f => ({
        ...f,
        message: f.message || `Hi! I'd like to talk about ${plan}. `,
      }));
    }
  }, [search]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      } else {
        const subject = encodeURIComponent(
          `Portfolio enquiry from ${form.name}`
        );
        const body = encodeURIComponent(
          `${form.message}\n\n— ${form.name}\n${form.email}`
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      }

      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status !== "sent" && status !== "error") return;
    const t = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(t);
  }, [status]);

  const buttonLabel = {
    idle: "Send Message →",
    sending: "Transmitting…",
    sent: "✓ Message Sent!",
    error: "Signal lost — try again",
  }[status];

  const inputStyle = (field: keyof FormData) => ({
    borderColor: errors[field]
      ? "var(--accent1)"
      : focused === field
        ? fieldAccent[field]
        : "var(--border)",
    color: "var(--text)",
    boxShadow:
      focused === field
        ? `0 0 0 3px color-mix(in srgb, ${fieldAccent[field]} 18%, transparent), 0 0 28px color-mix(in srgb, ${fieldAccent[field]} 25%, transparent)`
        : "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  });

  return (
    <>
      {/* Digital rain — the whole page runs the code */}
      <MatrixRain opacity={0.5} />

      {/* Vignette to keep the copy readable above the rain */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 38%, transparent 30%, color-mix(in srgb, var(--bg) 88%, transparent) 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center pt-32 pb-12">
          <div className="container">
            <div className="max-w-3xl animate-fadeUp">
              <p
                className="text-xs tracking-widest uppercase mb-5 animate-glitch"
                style={{ color: "var(--accent3)" }}
              >
                &gt; open_channel_
              </p>
              <Typewriter
                text={terminalCommand}
                className="block font-mono text-sm mb-8"
                style={{ color: "var(--accent2)" }}
              />
              <h1
                className="text-6xl lg:text-8xl font-extrabold mb-6 leading-tight animate-neon-glow"
                style={{ color: "var(--accent1)" }}
              >
                <ScrambleText
                  text="Let's Connect"
                  as="span"
                  delay={500}
                  duration={1300}
                  charset="アイウエオカキクサシス01<>/#$%&*+"
                />
              </h1>
              <p
                className="text-xl leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Got an idea — or a half-baked one? Tell me about it. I&apos;ll
                run it through CTRIQUEST™ and tell you honestly whether it can
                work.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Info */}
              <div>
                <Reveal variant="left">
                  <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                </Reveal>

                <Reveal variant="left" delay={120}>
                  <div
                    className="flex items-center gap-2 mb-5 font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    <span>melobix://channels</span>
                    <span
                      className="animate-blink"
                      style={{ color: "var(--accent1)" }}
                      aria-hidden="true"
                    >
                      ▮
                    </span>
                  </div>
                </Reveal>

                <div className="space-y-6">
                  {contacts.map((c, idx) => (
                    <Reveal
                      key={c.label}
                      variant="left"
                      delay={200 + idx * 100}
                    >
                      <a
                        href={c.href}
                        target={
                          c.href.startsWith("mailto:") ? undefined : "_blank"
                        }
                        rel={
                          c.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="flex items-center gap-4 p-4 rounded-lg border-2 transition-transform hover:scale-[1.02]"
                        style={{
                          borderColor: "var(--accent1)",
                          background: "var(--card)",
                        }}
                      >
                        <span
                          className="text-2xl w-8 text-center font-mono"
                          aria-hidden="true"
                        >
                          {c.icon}
                        </span>
                        <div>
                          <p
                            className="text-xs tracking-widest uppercase font-mono"
                            style={{ color: "var(--accent2)" }}
                          >
                            &gt; {c.label}
                          </p>
                          <p className="font-semibold font-mono">
                            {c.value}
                            <span
                              className="animate-blink ml-1"
                              style={{ color: "var(--accent3)" }}
                              aria-hidden="true"
                            >
                              ▮
                            </span>
                          </p>
                        </div>
                      </a>
                    </Reveal>
                  ))}
                </div>

                <Reveal variant="left" delay={550}>
                  <div
                    className="mt-12 p-6 rounded-lg border-2"
                    style={{
                      borderColor: "var(--accent3)",
                      background: "var(--card)",
                    }}
                  >
                    <p
                      className="text-sm font-mono"
                      style={{ color: "var(--accent3)" }}
                    >
                      {responseTime.icon} SIGNAL //{" "}
                      {responseTime.label.toUpperCase()}
                    </p>
                    <p className="font-bold mt-2">{responseTime.value}</p>
                  </div>
                </Reveal>
              </div>

              {/* Form */}
              <div>
                <Reveal variant="right">
                  <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
                </Reveal>

                <Reveal variant="right" delay={120}>
                  <div
                    className="flex items-center justify-between mb-6 px-4 py-3 rounded-lg border font-mono text-xs"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--card)",
                      color: "var(--muted)",
                    }}
                  >
                    <span>melobix://contact — secure</span>
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--accent4)" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--accent3)" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--accent1)" }}
                      />
                    </span>
                  </div>
                </Reveal>

                <Reveal variant="right" delay={200}>
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                    aria-busy={status === "sending"}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs tracking-widest uppercase mb-2 font-mono"
                        style={{ color: "var(--muted)" }}
                      >
                        &gt; Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Ada Okonkwo"
                        required
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        className="w-full px-4 py-3 rounded-lg border-2 bg-transparent focus:outline-none"
                        style={inputStyle("name")}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="mt-2 text-sm font-mono"
                          style={{ color: "var(--accent3)" }}
                        >
                          ! {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-widest uppercase mb-2 font-mono"
                        style={{ color: "var(--muted)" }}
                      >
                        &gt; Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="ada@company.com"
                        required
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className="w-full px-4 py-3 rounded-lg border-2 bg-transparent focus:outline-none"
                        style={inputStyle("email")}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-2 text-sm font-mono"
                          style={{ color: "var(--accent3)" }}
                        >
                          ! {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs tracking-widest uppercase mb-2 font-mono"
                        style={{ color: "var(--muted)" }}
                      >
                        &gt; Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="> tell_me_about_your_idea"
                        required
                        rows={6}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        className="w-full px-4 py-3 rounded-lg border-2 bg-transparent focus:outline-none resize-none"
                        style={inputStyle("message")}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="mt-2 text-sm font-mono"
                          style={{ color: "var(--accent3)" }}
                        >
                          ! {errors.message}
                        </p>
                      )}
                    </div>

                    <Magnetic className="w-full" strength={0.12}>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-4 rounded-lg font-bold text-lg font-mono transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100 animate-pulse-glow"
                        style={{
                          background:
                            status === "sent"
                              ? "var(--accent3)"
                              : status === "error"
                                ? "var(--accent4)"
                                : "var(--accent1)",
                          color: "var(--on-accent)",
                        }}
                      >
                        {buttonLabel}
                      </button>
                    </Magnetic>

                    <p
                      className="text-xs font-mono"
                      style={{ color: "var(--muted)" }}
                      aria-live="polite"
                    >
                      {status === "sent"
                        ? "// transmission received. I'll get back to you shortly."
                        : FORM_ENDPOINT
                          ? "// your message goes straight to my inbox."
                          : "// this opens your email client with the message pre-filled."}
                    </p>
                  </form>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="container text-center">
            <Reveal variant="blur">
              <h2
                className="text-4xl font-extrabold mb-6 animate-neon-glow"
                style={{ color: "var(--accent1)" }}
              >
                Let&apos;s Build Something Amazing
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p
                className="text-lg mb-8 max-w-2xl mx-auto"
                style={{ color: "var(--muted)" }}
              >
                Whether you have a project in mind, a pitch to sharpen, or just
                want to argue about ideas — let&apos;s talk.
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
