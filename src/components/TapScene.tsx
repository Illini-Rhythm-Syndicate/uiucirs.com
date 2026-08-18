import { useEffect, useRef, useState } from "react";

type TapState = "idle" | "near" | "go" | "ok";

const COPY: Record<TapState, { screen: string; status: string }> = {
  idle: { screen: "TOUCH TO START", status: "Hover your card over the reader." },
  near: { screen: "HOLD STEADY", status: "Bring it in, then click to tap." },
  go: { screen: "READING", status: "Reading your card..." },
  ok: { screen: "TAP ACCEPTED!", status: "Logged in! Opening the Discord..." },
};

export default function TapScene({ discordUrl }: { discordUrl: string }) {
  const [state, setState] = useState<TapState>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function after(delay: number, run: () => void) {
    timers.current.push(window.setTimeout(run, delay));
  }

  const near = () => setState((current) => (current === "idle" ? "near" : current));
  const away = () => setState((current) => (current === "near" ? "idle" : current));

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Let modifier-clicks behave like a normal link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (state === "go" || state === "ok") return;

    setState("go");
    after(460, () => setState("ok"));
    after(1500, () => {
      window.open(discordUrl, "_blank", "noopener");
      after(800, () => setState("idle"));
    });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <a
        className="group mx-auto block w-[min(572px,100%)] rounded-3xl no-underline"
        href={discordUrl}
        target="_blank"
        rel="noopener"
        data-state={state}
        aria-label="Tap your card to join the Discord"
        onMouseEnter={near}
        onMouseLeave={away}
        onFocus={near}
        onBlur={away}
        onTouchStart={near}
        onClick={handleClick}
      >
        <div className="@container relative aspect-[1.68] w-full cursor-pointer">
          <div
            className="absolute top-1/2 right-0 w-[56.75%] -translate-y-1/2 rounded-[26px] border-3 border-irs-ink bg-irs-navy p-[7%] shadow-[7px_7px_0_0_var(--color-irs-ink)]"
            aria-hidden="true"
          >
            <div className="absolute top-[4%] right-[5%] aspect-square w-[7%] rounded-full border-2 border-irs-ink bg-[#4a4a55] transition-[background-color,box-shadow] duration-250 group-data-[state=near]:bg-irs-gold group-data-[state=near]:shadow-[0_0_0_4px_rgba(247,201,72,0.4)] group-data-[state=go]:bg-irs-gold group-data-[state=go]:shadow-[0_0_0_4px_rgba(247,201,72,0.4)] group-data-[state=ok]:bg-irs-green group-data-[state=ok]:shadow-[0_0_0_4px_rgba(124,196,127,0.45)]" />

            <div className="flex flex-col gap-[2cqw] rounded-[14px] bg-irs-navy-deep p-[8%]">
              <div className="flex aspect-[3.75] w-full flex-none items-center justify-center overflow-hidden rounded-[6px] border-2 border-irs-ink bg-irs-ink">
                <span className="font-display text-[3.1cqw] font-bold tracking-[0.14em] whitespace-nowrap text-irs-cyan transition-colors duration-200 group-data-[state=near]:text-irs-gold group-data-[state=go]:text-irs-gold group-data-[state=ok]:text-irs-green">
                  {COPY[state].screen}
                </span>
              </div>

              <div className="relative flex aspect-[1.585] w-full flex-none items-center justify-center overflow-hidden rounded-[10px] border-2 border-irs-ink bg-irs-cream">
                <svg
                  viewBox="0 0 100 100"
                  className="h-[62%] w-auto -rotate-2 text-irs-cyan transition-colors duration-250 group-data-[state=near]:text-irs-gold group-data-[state=go]:text-irs-gold group-data-[state=ok]:text-irs-green"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                >
                  <circle cx="32" cy="50" r="5.5" fill="currentColor" stroke="none" />
                  <path d="M46 35 A 20 20 0 0 1 46.5 64" strokeWidth="7" />
                  <path d="M55 27 A 32 32 0 0 1 54.5 73" strokeWidth="6.4" />
                  <path d="M63 19 A 44 44 0 0 1 62 81" strokeWidth="5.8" />
                </svg>
                <div className="absolute top-1/2 left-1/2 aspect-square h-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-irs-gold opacity-0 group-data-[state=go]:animate-tap-ring group-data-[state=ok]:animate-tap-ring group-data-[state=ok]:border-irs-green" />
              </div>
            </div>
          </div>

          <div
            className="absolute top-1/2 left-0 z-2 aspect-[1.585] w-[41%] -translate-y-1/2 transition-[left,translate] duration-500 ease-[cubic-bezier(0.2,0.85,0.25,1)] group-data-[state=near]:left-[30%] group-data-[state=go]:left-[51.1%] group-data-[state=go]:translate-y-[calc(-50%_+_6.47cqw)] group-data-[state=ok]:left-[51.1%] group-data-[state=ok]:translate-y-[calc(-50%_+_6.47cqw)]"
            aria-hidden="true"
          >
            <div className="h-full w-full -rotate-9 overflow-hidden rounded-[14px] border-3 border-irs-ink bg-white shadow-[6px_6px_0_0_var(--color-irs-ink)] transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.85,0.25,1)] origin-[60%_50%] motion-safe:group-data-[state=idle]:animate-tap-bob group-data-[state=near]:-rotate-4 group-data-[state=near]:scale-[1.03] group-data-[state=go]:rotate-0 group-data-[state=ok]:rotate-0">
              <svg viewBox="0 0 300 190" className="block h-full w-full">
                <defs>
                  <linearGradient id="tap-swoosh" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#45c2d8" />
                    <stop offset="1" stopColor="#24406e" />
                  </linearGradient>
                </defs>
                <path
                  d="M243 22 A 118 118 0 0 1 158 178"
                  fill="none"
                  stroke="url(#tap-swoosh)"
                  strokeWidth="27"
                  strokeLinecap="round"
                />
                <circle cx="96" cy="74" r="26" fill="#45c2d8" />
                <text
                  className="font-display"
                  x="26"
                  y="166"
                  fontSize="34"
                  fontWeight="800"
                  fill="var(--color-irs-ink)"
                >
                  IRS
                </text>
              </svg>
            </div>
          </div>
        </div>
      </a>

      <div className="flex flex-col items-center gap-1">
        <p
          className="font-display text-center text-xl font-semibold text-irs-brown"
          aria-live="polite"
        >
          {COPY[state].status}
        </p>
        <p className="font-body text-center text-sm opacity-78">
          Or open{" "}
          <a className="underline" href={discordUrl} target="_blank" rel="noopener">
            {discordUrl.replace(/^https?:\/\//, "")}
          </a>{" "}
          directly.
        </p>
      </div>
    </div>
  );
}
