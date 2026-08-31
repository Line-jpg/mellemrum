function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton-block ${className}`.trim()} />;
}

export function SkeletonEventCard() {
  return (
    <div className="event-card skeleton-card" aria-hidden="true">
      <SkeletonBlock className="skeleton-image" />
      <div className="event-card-content">
        <SkeletonBlock className="skeleton-line skeleton-card-eyebrow" />
        <SkeletonBlock className="skeleton-line skeleton-card-title" />
        <SkeletonBlock className="skeleton-line skeleton-card-text" />
        <SkeletonBlock className="skeleton-line skeleton-card-text-short" />
      </div>
    </div>
  );
}

export function SkeletonEventDetail() {
  return (
    <section className="event-detail skeleton-detail" aria-hidden="true">
      <SkeletonBlock className="skeleton-image" />
      <div className="event-detail-content">
        <SkeletonBlock className="skeleton-line skeleton-detail-eyebrow" />
        <SkeletonBlock className="skeleton-line skeleton-detail-title" />
        <SkeletonBlock className="skeleton-line skeleton-detail-subtitle" />
        <SkeletonBlock className="skeleton-line skeleton-detail-paragraph" />
        <SkeletonBlock className="skeleton-line skeleton-detail-paragraph-long" />
      </div>
    </section>
  );
}

export function SkeletonRegistrationRow() {
  return (
    <div className="registration-row skeleton-row" aria-hidden="true">
      <div>
        <SkeletonBlock className="skeleton-line skeleton-row-title" />
        <SkeletonBlock className="skeleton-line skeleton-row-subtitle" />
      </div>
      <SkeletonBlock className="skeleton-line skeleton-row-cell-1" />
      <SkeletonBlock className="skeleton-line skeleton-row-cell-2" />
      <SkeletonBlock className="skeleton-line skeleton-row-cell-3" />
    </div>
  );
}
