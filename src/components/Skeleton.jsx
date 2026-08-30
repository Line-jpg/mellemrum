function SkeletonBlock({ className = "", style }) {
  return <div className={`skeleton-block ${className}`.trim()} style={style} />;
}

export function SkeletonEventCard() {
  return (
    <div className="event-card skeleton-card" aria-hidden="true">
      <SkeletonBlock className="skeleton-image" />
      <div className="event-card-content">
        <SkeletonBlock className="skeleton-line" style={{ width: "35%" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "80%", height: "1.6rem" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "95%" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "60%" }} />
      </div>
    </div>
  );
}

export function SkeletonEventDetail() {
  return (
    <section className="event-detail skeleton-detail" aria-hidden="true">
      <SkeletonBlock className="skeleton-image" />
      <div className="event-detail-content">
        <SkeletonBlock className="skeleton-line" style={{ width: "25%" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "70%", height: "3rem" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "90%" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "100%", height: "4.5rem" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "100%", height: "6rem" }} />
      </div>
    </section>
  );
}

export function SkeletonRegistrationRow() {
  return (
    <div className="registration-row skeleton-row" aria-hidden="true">
      <div>
        <SkeletonBlock className="skeleton-line" style={{ width: "70%" }} />
        <SkeletonBlock className="skeleton-line" style={{ width: "50%", height: "0.7rem", marginTop: "0.3rem" }} />
      </div>
      <SkeletonBlock className="skeleton-line" style={{ width: "60%" }} />
      <SkeletonBlock className="skeleton-line" style={{ width: "50%" }} />
      <SkeletonBlock className="skeleton-line" style={{ width: "40%" }} />
    </div>
  );
}
