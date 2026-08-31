import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { SkeletonRegistrationRow } from "../components/Skeleton";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRegistrations() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${SUPABASE_URL}/registrations?order=createdAt.desc`, { headers });
        if (!response.ok) throw new Error("Kunne ikke hente tilmeldinger.");
        const data = await response.json();
        setRegistrations(data);
        setRegistrationCount(data.length);
      } catch (err) {
        console.error(err);
        setError("Der opstod en fejl. Prøv at genindlæse siden.");
      } finally {
        setIsLoading(false);
      }
    }

    getRegistrations();
  }, []);

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{isLoading ? "Indlæser…" : `${registrationCount} tilmeldinger i alt`}</p>
      </header>
      <main>
        <div className="registration-list" aria-busy={isLoading}>
          <div className="registration-row registration-labels">
            <span>Navn</span>
            <span>Event</span>
            <span>Dato</span>
            <span>Status</span>
          </div>
          {isLoading && (
            <>
              <p role="status" className="sr-only">Indlæser tilmeldinger…</p>
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRegistrationRow key={index} />
              ))}
            </>
          )}
          {!isLoading && error && <p className="message" role="alert">{error}</p>}
          {!isLoading && !error && registrations.length === 0 && (
            <p className="message">Ingen tilmeldinger endnu.</p>
          )}
          {!isLoading && !error && registrations.map((registration) => (
            <div className="registration-row" key={registration.id}>
              <div>
                <strong>{registration.name}</strong>
                <small>{registration.email}</small>
              </div>
              <span>{registration.eventTitle}</span>
              <span>{new Date(registration.eventDate).toLocaleDateString("da-DK")}</span>
              <span className="status">{registration.status}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
