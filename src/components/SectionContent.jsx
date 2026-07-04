import "../styles/SectionContent.css";

export default function SectionContent({
  id,
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section className="section-content" id={id}>
      <div className="section-content__head">
        {eyebrow && <p className="section-content__eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="section-content__body">{children}</div>
    </section>
  );
}
