import { useState } from "react";
import "../styles/TrackSection.css";

const locations = [
  {
    id: "upr",
    name: "University Of Port Harcourt",
    city: "Port Harcourt",
    address: "East/West Road in Choba, Rivers State, Nigeria",
  },
  {
    id: "rsu",
    name: "Rivers State University",
    city: "Port Harcourt",
    address: "Nkpolu-Oroworukwo, Port Harcourt, Rivers State, Nigeria",
  },
  {
    id: "iau",
    name: "Ignatius Ajulu University",
    city: "Port Harcourt",
    address: "P.M.B. 5047 Rumuolumeni, Port Harcourt, Rivers State, Nigeria",
  },
];

export default function TrackSection() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const mapQuery = encodeURIComponent(selectedLocation.address);
  const mapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    selectedLocation.address,
  )}`;

  return (
    <section className="track" id="track-the-event">
      <div className="track__intro">
        <p className="track__eyebrow">Track the Event</p>
        <h2>Campus locations are live on the map</h2>
        <p>You will be notified of changes to location if there is any.</p>
      </div>
      <div className="track__map">
        <div className="track__map-frame">
          <iframe
            title="Campus map"
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="track__map-details">
            <div>
              <strong>{selectedLocation.name}</strong>
              <p>{selectedLocation.address}</p>
            </div>
            <a
              className="track__map-action"
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps
            </a>
          </div>
        </div>
        <div className="track__locations">
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              className={`track__location ${
                selectedLocation.id === location.id ?
                  "track__location--active"
                : ""
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div>
                <strong>{location.name}</strong>
                <small>{location.city}</small>
              </div>
              <span>Get directions</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
