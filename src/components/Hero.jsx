import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar.jsx";
import "../styles/Hero.css";

const slides = [
  {
    type: "image",
    label: "Conference keynote",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    type: "video",
    label: "Executive talk",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    type: "image",
    label: "Institution campus",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
];

function formatCountdown(duration) {
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function Hero({ onOpenSignup }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState("");

  const eventDate = useMemo(() => new Date("2026-07-03T09:00:00"), []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const diff = eventDate - new Date();
      setCountdown(diff > 0 ? formatCountdown(diff) : "Event Live");
    }, 1000);
    return () => window.clearInterval(interval);
  }, [eventDate]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="hero" id="home">
      <div className="hero__media">
        {slides.map((slide, index) => (
          <div
            key={slide.label}
            className={`hero__slide ${index === activeIndex ? "hero__slide--active" : ""}`}
          >
            {slide.type === "video" ?
              <video autoPlay muted loop playsInline>
                <source src={slide.src} type="video/mp4" />
              </video>
            : <img src={slide.src} alt={slide.label} />}
          </div>
        ))}
      </div>

      <div className="hero__overlay">
        <header className="hero__header">
          <div className="hero__brand">TheCampusCeo</div>
          <Navbar />
        </header>

        <div className="hero__content">
          <p className="hero__eyebrow">Think Like A CEO</p>
          <h1>Become A CEO</h1>
          <p className="hero__subtext">
            Be empowered to solve problems and impact your world.
          </p>
          <button className="hero__cta" type="button" onClick={onOpenSignup}>
            Get Ticket
          </button>
        </div>

        <aside className="hero__panel hero__panel--right">
          <span className="hero__panel-label">Upcoming Event</span>
          <strong>July 3rd, 2026</strong>
          <small>Countdown to the first campus launch</small>
          <div className="hero__countdown">{countdown}</div>
        </aside>
      </div>
    </section>
  );
}
