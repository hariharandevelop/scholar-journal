import { Skeleton } from "@/components/ui/skeleton";
import { useApprovedPapers } from "@/hooks/use-papers";
import type { Submission } from "@/types";
import { ExternalLink, FileText, RefreshCw } from "lucide-react";
import { useCallback, useState } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const date = new Date(Number(ts) / 1_000_000);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

function relativeLabel(ts: bigint): string {
  const diff = Date.now() - Number(ts) / 1_000_000;
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}yr ago`;
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="card-minimal flex flex-col overflow-hidden">
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-5 w-4/5 rounded-none" />
        <Skeleton className="h-3 w-3/5 rounded-none" />
        <div className="pt-3 border-t border-border flex justify-between">
          <Skeleton className="h-3 w-1/3 rounded-none" />
          <Skeleton className="h-3 w-16 rounded-none" />
        </div>
      </div>
    </div>
  );
}

// ─── Paper Card ─────────────────────────────────────────────────────────────

function PaperCard({ paper }: { paper: Submission }) {
  const screenshotUrl = paper.screenshotFileId.getDirectURL();
  const pdfUrl = paper.pdfFileId.getDirectURL();
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="card-minimal flex flex-col overflow-hidden group hover:shadow-md transition-smooth"
      data-ocid="paper-card"
    >
      {/* Screenshot image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted border-b border-border">
        {!imgError ? (
          <img
            src={screenshotUrl}
            alt={`Preview for paper by ${paper.submitterName}`}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-smooth"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <FileText className="w-8 h-8 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              No Preview
            </span>
          </div>
        )}
        {/* Relative date badge */}
        <div className="absolute top-2 right-2 bg-foreground text-background px-2 py-0.5">
          <span className="font-mono text-[10px] uppercase tracking-widest">
            {relativeLabel(paper.submittedAt)}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {/* Title / Submitter name */}
        <h2 className="font-display italic text-lg leading-tight text-foreground line-clamp-2">
          {paper.submitterName}
        </h2>

        {/* College name */}
        <p className="font-body text-xs text-muted-foreground uppercase tracking-wide truncate">
          {paper.collegeName}
        </p>

        {/* Footer row */}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
          <time
            className="font-mono text-[11px] text-muted-foreground"
            dateTime={new Date(
              Number(paper.submittedAt) / 1_000_000,
            ).toISOString()}
          >
            {formatDate(paper.submittedAt)}
          </time>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-widest underline underline-offset-2 hover:text-muted-foreground transition-smooth"
            data-ocid="view-paper-btn"
            aria-label={`View PDF submitted by ${paper.submitterName}`}
          >
            <ExternalLink className="w-3 h-3" />
            View PDF
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LatestPage() {
  const {
    data: papers,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useApprovedPapers();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const handleRefresh = useCallback(async () => {
    await refetch();
    setLastRefreshed(new Date());
  }, [refetch]);

  const sorted = papers
    ? [...papers].sort((a, b) => Number(b.submittedAt) - Number(a.submittedAt))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="border-b border-border pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-display font-display italic text-foreground">
            Latest Papers
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Peer-reviewed research published in Scholar Journal.{" "}
            {!isLoading && sorted.length > 0 && (
              <span className="font-mono text-xs">
                {sorted.length} paper{sorted.length !== 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>

        {/* Refresh controls */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-[11px] text-muted-foreground hidden sm:block">
            Updated{" "}
            {lastRefreshed.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isFetching}
            className="button-primary flex items-center gap-2 disabled:opacity-50"
            data-ocid="refresh-btn"
            aria-label="Refresh papers list"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Auto-poll notice */}
      <div className="mb-6 border-l-2 border-border pl-3">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
          Auto-refreshing every 30 seconds · Public archive · All approved
          submissions
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={`sk-${i.toString()}`} />
          ))}
        </div>
      ) : isError ? (
        <div
          className="card-minimal p-10 text-center"
          data-ocid="papers-error-state"
        >
          <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-body text-sm text-foreground font-medium mb-1">
            Unable to load papers
          </p>
          <p className="font-body text-xs text-muted-foreground mb-5">
            There was a problem fetching the archive. Please try again.
          </p>
          <button
            type="button"
            onClick={handleRefresh}
            className="button-primary"
            data-ocid="error-retry-btn"
          >
            Try Again
          </button>
        </div>
      ) : sorted.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="papers-grid"
        >
          {sorted.map((paper) => (
            <PaperCard key={paper.id.toString()} paper={paper} />
          ))}
        </div>
      ) : (
        <div
          className="card-minimal p-16 text-center"
          data-ocid="papers-empty-state"
        >
          <div className="w-12 h-12 border border-border flex items-center justify-center mx-auto mb-5">
            <FileText className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="font-display italic text-2xl text-foreground mb-2">
            No papers published yet
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-7 max-w-sm mx-auto">
            No papers published yet. Be the first to submit your research.
          </p>
          <a
            href="/"
            className="button-primary inline-block"
            data-ocid="submit-cta"
          >
            Submit a Paper
          </a>
        </div>
      )}
    </div>
  );
}
