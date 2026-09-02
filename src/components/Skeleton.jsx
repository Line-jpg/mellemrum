import styles from "./Skeleton.module.css";
import eventCardStyles from "./EventCard.module.css";
import eventPageStyles from "../pages/EventPage.module.css";
import registrationsStyles from "../pages/RegistrationsPage.module.css";

function SkeletonBlock({ className = "" }) {
  return <div className={`${styles.skeletonBlock} ${className}`.trim()} />;
}

export function SkeletonEventCard() {
  return (
    <div className={`${eventCardStyles.eventCard} skeleton-card`} aria-hidden="true">
      <SkeletonBlock className={styles.skeletonImage} />
      <div className={eventCardStyles.eventCardContent}>
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonCardEyebrow}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonCardTitle}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonCardText}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonCardTextShort}`} />
      </div>
    </div>
  );
}

export function SkeletonEventDetail() {
  return (
    <section className={`${eventPageStyles.eventDetail} ${styles.skeletonDetail}`} aria-hidden="true">
      <SkeletonBlock className={styles.skeletonImage} />
      <div className={eventPageStyles.eventDetailContent}>
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonDetailEyebrow}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonDetailTitle}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonDetailSubtitle}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonDetailParagraph}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonDetailParagraphLong}`} />
      </div>
    </section>
  );
}

export function SkeletonRegistrationRow() {
  return (
    <div className={`${registrationsStyles.registrationRow} skeleton-row`} aria-hidden="true">
      <div>
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonRowTitle}`} />
        <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonRowSubtitle}`} />
      </div>
      <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonRowCell1}`} />
      <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonRowCell2}`} />
      <SkeletonBlock className={`${styles.skeletonLine} ${styles.skeletonRowCell3}`} />
    </div>
  );
}
