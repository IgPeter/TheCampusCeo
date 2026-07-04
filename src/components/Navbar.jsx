import { useState } from "react";
import "../styles/Navbar.css";

const navItems = [
  "Home",
  "Speakers",
  "Track the Event",
  "Past Events",
  "Signup",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar ${isOpen ? "navbar--open" : ""}`}>
      <button
        type="button"
        className="navbar__toggle"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className="navbar__links">
        {navItems.map((item) => {
          const href = `#${item.toLowerCase().replace(/ /g, "-")}`;
          return (
            <li key={item} className="navbar__item">
              <a
                href={href}
                className="navbar__link"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
