import "../styles/EventCard.css";

export default function EventCard({ title, subtitle, media, caption }) {
  return (
    <article className="event-card">
      <div className="event-card__media">{media}</div>
      <div className="event-card__body">
        <strong>{title}</strong>
        <p>{subtitle}</p>
        <small>{caption}</small>
      </div>
    </article>
  );
}
