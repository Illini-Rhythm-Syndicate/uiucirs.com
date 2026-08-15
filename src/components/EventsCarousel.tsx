import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export interface EventCard {
  title: string;
  description: string;
  date: string;
}

const GAP = 24;

const buttonClass =
  "shrink-0 flex items-center justify-center w-10 h-10 border-3 border-irs-ink rounded-full bg-irs-cream text-irs-ink transition shadow-[2px_2px_0_0_var(--color-irs-ink)] hover:bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-irs-ink)] disabled:opacity-30 disabled:pointer-events-none";

export default function EventsCarousel({ events }: { events: EventCard[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const syncScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setCanScrollLeft(scroller.scrollLeft > 1);
    setCanScrollRight(scroller.scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    syncScrollState();
    scroller.addEventListener("scroll", syncScrollState, { passive: true });

    const observer = new ResizeObserver(syncScrollState);
    observer.observe(scroller);

    return () => {
      scroller.removeEventListener("scroll", syncScrollState);
      observer.disconnect();
    };
  }, [syncScrollState]);

  function scrollByCard(direction: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.firstElementChild as HTMLElement | null;
    const distance = card ? card.offsetWidth + GAP : scroller.clientWidth;
    scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label="Scroll to previous events"
        disabled={!canScrollLeft}
        onClick={() => scrollByCard(-1)}
        className={buttonClass}
      >
        <FaArrowLeft size={18} />
      </button>

      <div
        ref={scrollerRef}
        className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[calc((100%-1.5rem)/2)] lg:auto-cols-[calc((100%-3rem)/3)] gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden min-w-0 flex-1 pb-3 pr-2"
      >
        {events.map((event) => (
          <div
            key={event.title}
            className="snap-start flex flex-col gap-2 p-6 border-3 border-irs-ink rounded-3xl bg-irs-cream text-irs-ink shadow-[6px_6px_0_0_var(--color-irs-ink)]"
          >
            <span className="font-display text-lg text-irs-brown font-semibold">{event.date}</span>
            <h3 className="font-display text-2xl font-bold">{event.title}</h3>
            <p className="font-body text-base">{event.description}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll to next events"
        disabled={!canScrollRight}
        onClick={() => scrollByCard(1)}
        className={buttonClass}
      >
        <FaArrowRight size={18} />
      </button>
    </div>
  );
}
