import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { createRegistration } from "../services/registrations";
import Footer from "../components/Footer";
import { SkeletonEventDetail } from "../components/Skeleton";
import styles from "./EventPage.module.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEvent() {
      setIsLoading(true);
      setError(null);
      try {
        const query = "select=*,venue:venues(*)";
        const response = await fetch(
          `${SUPABASE_URL}/events?id=eq.${eventId}&${query}`,
          {
            headers,
          },
        );
        if (!response.ok) throw new Error("Kunne ikke hente eventet.");
        const data = await response.json();
        setEvent(data[0] ?? null);
      } catch (err) {
        console.error(err);
        setError("Der opstod en fejl. Prøv at genindlæse siden.");
      } finally {
        setIsLoading(false);
      }
    }

    getEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await createRegistration({
        name: name.trim(),
        email: email.trim(),
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.venue.name,
      });

      setName("");
      setEmail("");
      setSubmitMessage("Tak! Din tilmelding er registreret.");
    } catch (error) {
      console.error(error);
      setSubmitMessage("Tilmeldingen kunne ikke gemmes. Prøv igen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className={styles.eventPage} aria-busy="true">
        <Link className={styles.backLink} to="/">
          ← Alle events
        </Link>
        <p role="status" className="sr-only">
          Indlæser event…
        </p>
        <SkeletonEventDetail />
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.eventPage}>
        <Link className={styles.backLink} to="/">
          ← Alle events
        </Link>
        <p className={styles.message} role="alert">
          {error}
        </p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className={styles.eventPage}>
        <Link className={styles.backLink} to="/">
          ← Alle events
        </Link>
        <p className={styles.message} role="status">
          Vi kunne ikke finde det event, du leder efter.
        </p>
      </main>
    );
  }

  const date = new Date(event.date);

  return (
    <>
      <main className={styles.eventPage}>
        <Link className={styles.backLink} to="/">
          ← Alle events
        </Link>

        <section className={styles.eventDetail}>
          <img src={event.image} alt="" loading="eager" />
          <div className={styles.eventDetailContent}>
            <p className={styles.eventCategory}>{event.category}</p>
            <h1>{event.title}</h1>
            <p className={styles.lead}>{event.summary}</p>
            <div className={styles.detailList}>
              <p>
                <strong>Dato</strong>
                {date.toLocaleDateString("da-DK", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
                kl.{" "}
                {date.toLocaleTimeString("da-DK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Sted</strong>
                <span>
                  {event.venue.name}
                  <br />
                  {event.venue.address}, {event.venue.postalCode}{" "}
                  {event.venue.city}
                  {event.venue.website && (
                    <>
                      <br />
                      <a href={event.venue.website}>Besøg venue</a>
                    </>
                  )}
                </span>
              </p>
              <p>
                <strong>Pris</strong>
                {event.price === 0 ? "Gratis" : `${event.price} kr.`}
              </p>
            </div>
            <p>{event.description}</p>
          </div>
        </section>

        <section className={styles.signupPanel}>
          <div>
            <p className={styles.eyebrowDark}>Tilmelding</p>
            <h2>Reserver din plads</h2>
            <p>
              Udfyld formularen, så sender vi din tilmelding til arrangøren.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Navn
              <input
                required
                value={name}
                onChange={(inputEvent) => setName(inputEvent.target.value)}
                placeholder="Dit fulde navn"
              />
            </label>
            <span>E-mail</span>
            <input
              value={email}
              onChange={(inputEvent) => setEmail(inputEvent.target.value)}
              placeholder="dig@example.com"
              required
              type="email"
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Gemmer..." : "Tilmeld mig"}
            </button>
            {submitMessage && <span role="status">{submitMessage}</span>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
