interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`mb-12 ${centered ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && (
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--accent3)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl font-bold">{title}</h2>
      {description && (
        <p
          className="mt-4 text-lg leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
