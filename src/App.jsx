import { useState } from "react";
import Hero from "./components/Hero.jsx";
import ModalSignup from "./components/ModalSignup.jsx";
import SectionContent from "./components/SectionContent.jsx";
import EventCard from "./components/EventCard.jsx";
import SpeakerGrid from "./components/SpeakerGrid.jsx";
import TrackSection from "./components/TrackSection.jsx";
import SuccessStories from "./components/SuccessStories.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import logo from "./assets/perttosdigital_logo.jpeg";
import "./styles/global.css";

const pastEvents = [
  {
    title: "University of Port Harcourt Launch",
    subtitle: "Founder mindset training in Port Harcourt",
    media: (
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
        alt="Port Harcourt event"
      />
    ),
    caption: "High-energy breakout sessions with startup mentors.",
  },
  {
    title: "Abuja Campus Showcase",
    subtitle: "Networking and pitch preparation",
    media: (
      <video muted loop playsInline>
        <source
          src="https://www.w3schools.com/html/movie.mp4"
          type="video/mp4"
        />
      </video>
    ),
    caption: "Actionable talks from investors and founders.",
  },
  {
    title: "Founder Growth Summit",
    subtitle: "Problem solving and team building",
    media: (
      <img
        src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80"
        alt="Founder summit"
      />
    ),
    caption: "Real founder stories from three campuses.",
  },
];

export default function App() {
  const [isSignupOpen, setSignupOpen] = useState(false);

  return (
    <div className="app">
      <Hero onOpenSignup={() => setSignupOpen(true)} />
      <main>
        <SectionContent
          id="past-events"
          eyebrow="Past events"
          title="The Campus CEO has already been in 3 campuses in Port Harcourt and Abuja."
          description="Exciting moments from past conferences with founders, mentors, and energy that changed the game."
        >
          <div className="event-grid">
            {pastEvents.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </SectionContent>

        <SectionContent
          id="upcoming-events"
          eyebrow="Upcoming Event"
          title="The Campus CEO is coming to three campuses in Port Harcourt City"
          description="University Of Port Harcourt, Rivers State University and Ignatius Ajuru University on July 3rd - 5th, 2026."
        >
          <div className="announcement-card">
            <p>
              Join us for a powerful three-day founder conference with expert
              speakers, live coaching, and campus networking across three major
              universities.
            </p>
          </div>
        </SectionContent>

        <SectionContent
          id="speakers"
          eyebrow="Meet our speakers"
          title="Top founders and leaders will share the stage."
          description="Learn from professional founders, investor relations experts, and growth strategists."
        >
          <SpeakerGrid />
        </SectionContent>

        <TrackSection />
        <SuccessStories />
      </main>

      <footer className="footer">
        <div className="footer__brand">
          <strong>The Campus CEO</strong>
          <p>
            Developing founders through live events, mentorship and business
            leadership.
          </p>
        </div>
        <div className="footer__info">
          <p>Contact</p>
          <a href="mailto:hello@thecampusceo.com">hello@thecampusceo.com</a>
        </div>
        <div className="footer__copyright">
          <p style={{ margin: 20 }}>Copyright © 2026 Perttos Digital</p>
          <img src={logo} alt="Perttos Digital" />
        </div>
      </footer>

      <ModalSignup isOpen={isSignupOpen} onClose={() => setSignupOpen(false)} />
      <ScrollToTop />
    </div>
  );
}
