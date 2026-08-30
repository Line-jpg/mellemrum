import { useEffect, useState } from "react";
import { Link } from "react-router";
import EventCard from "../components/EventCard";
import { SkeletonEventCard } from "../components/Skeleton";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEvents() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${SUPABASE_URL}/events?order=date.asc`, { headers });
        if (!response.ok) throw new Error("Kunne ikke hente events.");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Der opstod en fejl. Prøv at genindlæse siden.");
      } finally {
        setIsLoading(false);
      }
    }

    getEvents();
  }, []);

  const categories = ["Alle", ...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const searchText = `${event.title} ${event.summary} ${event.venueName}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Kultur i Aarhus</p>
        <h1>Find plads til noget nyt.</h1>
        <p className="hero-copy">
          Koncerter, talks og workshops samlet ét sted. Find dit næste event, og tilmeld dig på få minutter.
        </p>
        <a className="hero-link" href="#events">
          Se kommende events ↓
        </a>
      </header>

      <main id="events">
        <section className="section-heading">
          <div>
            <p className="eyebrow dark">Det sker</p>
            <h2>Kommende events</h2>
          </div>
          <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
        </section>

        <section className="filters">
          <label>
            Søg
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Søg efter titel eller sted"
            />
          </label>
          <label>
            Kategori
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="event-grid" aria-busy={isLoading}>
          {isLoading && (
            <>
              <p role="status" className="sr-only">Indlæser events…</p>
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonEventCard key={index} />
              ))}
            </>
          )}
          {!isLoading && error && <p className="message" role="alert">{error}</p>}
          {!isLoading && !error && filteredEvents.length === 0 && (
            <p className="message">Ingen events matcher din søgning.</p>
          )}
          {!isLoading && !error && filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="footer-brand">
              mellemrum<span>.</span>
            </p>
            <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <div className="footer-link-group">
              <p className="footer-heading">Udforsk</p>
              <Link to="/">Events</Link>
              <Link to="/om">Om Mellemrum</Link>
            </div>
            <div className="footer-link-group">
              <p className="footer-heading">For arrangører</p>
              <Link to="/tilmeldinger">Se tilmeldinger</Link>
              <a href="mailto:hej@mellemrum.dk">Kontakt os</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-meta">© 2026 Mellemrum</p>
          <p>Aarhus, Danmark</p>
        </div>
      </footer>
    </>
  );
}
