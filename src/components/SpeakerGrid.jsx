import "../styles/SpeakerGrid.css";

const speakers = [
  {
    name: "Adaeze Nwosu",
    title: "Founder Coach",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Emeka Okoye",
    title: "Growth Strategist",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chioma Amadi",
    title: "Investor Relations",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kwame Mensah",
    title: "Product Lead",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function SpeakerGrid() {
  return (
    <div className="speaker-grid" id="speakers">
      {speakers.map((speaker) => (
        <article key={speaker.name} className="speaker-card">
          <img src={speaker.image} alt={speaker.name} />
          <div>
            <strong>{speaker.name}</strong>
            <span>{speaker.title}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
