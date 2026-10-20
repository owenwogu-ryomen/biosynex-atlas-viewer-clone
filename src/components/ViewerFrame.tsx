import { useEffect, useRef, useState } from "react";

type ViewerFrameProps = {
  title: string;
  embedUrl?: string | undefined;
  embedHtml?: string | undefined;
  posterUrl?: string | undefined;
  posterFit?: "cover" | "contain" | undefined;
  posterCredit?: string | undefined;
  posterCreditUrl?: string | undefined;
  modelCredit?: string | undefined;
  modelCreditUrl?: string | undefined;
  emptyTitle?: string | undefined;
  emptyBody?: string | undefined;
};

// Image-first 3D viewer: the viewport shows a still illustration/photo of the
// device. On desktop, hovering reveals a "View 3D model" button over the
// image; an always-visible button below the viewport does the same job on
// touch devices (where there is no hover). The heavy WebGL embed iframe is
// only mounted after a click — as a brand-new iframe every time — so leaving
// and returning to the page never tries to revive a stale WebGL session.
// The loaded view can go true fullscreen via the Fullscreen API.
export function ViewerFrame({
  title,
  embedUrl,
  embedHtml,
  posterUrl,
  posterFit = "cover",
  posterCredit,
  posterCreditUrl,
  modelCredit,
  modelCreditUrl,
  emptyTitle = "3D viewer",
  emptyBody,
}: ViewerFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // If the device changes, go back to the still image instead of keeping an old embed alive.
  useEffect(() => {
    setIsLoaded(false);
  }, [embedUrl, embedHtml]);

  const toggleFullscreen = () => {
    if (!frameRef.current) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void frameRef.current.requestFullscreen();
    }
  };

  const openModel = () => {
    setLoadCount((c) => c + 1);
    setIsLoaded(true);
  };

  const closeModel = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    }
    setIsLoaded(false);
  };

  const hasEmbed = Boolean(embedUrl || embedHtml);
  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  const creditClass = "text-xs text-muted-foreground";

  return (
    <div>
      <div
        ref={frameRef}
        className="viewer-frame group relative aspect-[16/10] w-full rounded-xl border border-border bg-card overflow-hidden signal-grid"
      >
        {!hasEmbed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <p className="font-display text-xl">{emptyTitle}</p>
            {emptyBody ? <p className="text-muted-foreground text-sm mt-2 max-w-sm">{emptyBody}</p> : null}
          </div>
        ) : !isLoaded ? (
          <>
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${title} — illustrated preview. Use the View 3D model button to open the interactive model.`}
                className={`absolute inset-0 h-full w-full ${posterFit === "contain" ? "object-contain bg-white" : "object-cover"}`}
                loading="lazy"
              />
            ) : null}
            <span className="absolute left-3 top-3 z-10 rounded-full bg-black/65 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white">
              3D available
            </span>
            {/* Desktop: revealed on hover (or keyboard focus). Mobile uses the button below. */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover:opacity-100">
              <button
                type="button"
                onClick={openModel}
                aria-label={`View the interactive 3D model of ${title}`}
                className={primaryButtonClass}
              >
                <span aria-hidden>▶</span> View 3D model
              </button>
            </div>
          </>
        ) : embedUrl ? (
          <iframe
            key={`${embedUrl}#${loadCount}`}
            src={embedUrl}
            title={`${title} 3D model`}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
        ) : (
          <div
            key={`embed-html#${loadCount}`}
            className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full"
            dangerouslySetInnerHTML={{ __html: embedHtml ?? "" }}
          />
        )}
        {hasEmbed && isLoaded && (
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-md border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
          >
            {isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          </button>
        )}
      </div>

      {hasEmbed && !isLoaded && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={openModel}
            aria-label={`View the interactive 3D model of ${title}`}
            className={`${primaryButtonClass} max-sm:w-full`}
          >
            <span aria-hidden>▶</span> View 3D model
          </button>
          <p className="min-w-[220px] flex-1 text-sm text-muted-foreground">
            You are seeing a still illustration. Tap the button to open the interactive 3D model you can rotate and zoom.
          </p>
          {posterCredit ? (
            posterCreditUrl ? (
              <a href={posterCreditUrl} target="_blank" rel="noreferrer" className={`${creditClass} hover:underline`}>
                {posterCredit}
              </a>
            ) : (
              <span className={creditClass}>{posterCredit}</span>
            )
          ) : null}
        </div>
      )}

      {hasEmbed && isLoaded && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={closeModel}
            aria-label="Close 3D model and return to the illustration"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary max-sm:w-full"
          >
            Close 3D model
          </button>
          <p className="min-w-[220px] flex-1 text-sm text-muted-foreground">Drag to rotate. Scroll or pinch to zoom.</p>
          {modelCredit ? (
            modelCreditUrl ? (
              <a href={modelCreditUrl} target="_blank" rel="noreferrer" className={`${creditClass} hover:underline`}>
                {modelCredit}
              </a>
            ) : (
              <span className={creditClass}>{modelCredit}</span>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}
