import { j as jsxRuntimeExports, r as reactExports } from "./index-D8UIE2Qr.js";
import { c as cn } from "./utils-2v2HxlWs.js";
import { a as useApprovedPapers } from "./use-papers-SmsmIgIY.js";
import { c as createLucideIcon } from "./createLucideIcon-Ch5jP8Jr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function formatDate(ts) {
  const date = new Date(Number(ts) / 1e6);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });
}
function relativeLabel(ts) {
  const diff = Date.now() - Number(ts) / 1e6;
  const days = Math.floor(diff / 864e5);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}yr ago`;
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-minimal flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[4/3] rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-4/5 rounded-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/5 rounded-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3 rounded-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16 rounded-none" })
      ] })
    ] })
  ] });
}
function PaperCard({ paper }) {
  const screenshotUrl = paper.screenshotFileId.getDirectURL();
  const pdfUrl = paper.pdfFileId.getDirectURL();
  const [imgError, setImgError] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "card-minimal flex flex-col overflow-hidden group hover:shadow-md transition-smooth",
      "data-ocid": "paper-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[4/3] overflow-hidden bg-muted border-b border-border", children: [
          !imgError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: screenshotUrl,
              alt: `Preview for paper by ${paper.submitterName}`,
              className: "w-full h-full object-cover group-hover:scale-[1.02] transition-smooth",
              onError: () => setImgError(true),
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "No Preview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 bg-foreground text-background px-2 py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest", children: relativeLabel(paper.submittedAt) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-lg leading-tight text-foreground line-clamp-2", children: paper.submitterName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground uppercase tracking-wide truncate", children: paper.collegeName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 border-t border-border flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "time",
              {
                className: "font-mono text-[11px] text-muted-foreground",
                dateTime: new Date(
                  Number(paper.submittedAt) / 1e6
                ).toISOString(),
                children: formatDate(paper.submittedAt)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: pdfUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-widest underline underline-offset-2 hover:text-muted-foreground transition-smooth",
                "data-ocid": "view-paper-btn",
                "aria-label": `View PDF submitted by ${paper.submitterName}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                  "View PDF"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function LatestPage() {
  const {
    data: papers,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useApprovedPapers();
  const [lastRefreshed, setLastRefreshed] = reactExports.useState(/* @__PURE__ */ new Date());
  const handleRefresh = reactExports.useCallback(async () => {
    await refetch();
    setLastRefreshed(/* @__PURE__ */ new Date());
  }, [refetch]);
  const sorted = papers ? [...papers].sort((a, b) => Number(b.submittedAt) - Number(a.submittedAt)) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display font-display italic text-foreground", children: "Latest Papers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground mt-1", children: [
          "Peer-reviewed research published in Scholar Journal.",
          " ",
          !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs", children: [
            sorted.length,
            " paper",
            sorted.length !== 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground hidden sm:block", children: [
          "Updated",
          " ",
          lastRefreshed.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleRefresh,
            disabled: isFetching,
            className: "button-primary flex items-center gap-2 disabled:opacity-50",
            "data-ocid": "refresh-btn",
            "aria-label": "Refresh papers list",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Refresh" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 border-l-2 border-border pl-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-muted-foreground uppercase tracking-wider", children: "Auto-refreshing every 30 seconds · Public archive · All approved submissions" }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, `sk-${i.toString()}`)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-minimal p-10 text-center",
        "data-ocid": "papers-error-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground font-medium mb-1", children: "Unable to load papers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mb-5", children: "There was a problem fetching the archive. Please try again." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleRefresh,
              className: "button-primary",
              "data-ocid": "error-retry-btn",
              children: "Try Again"
            }
          )
        ]
      }
    ) : sorted.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "papers-grid",
        children: sorted.map((paper) => /* @__PURE__ */ jsxRuntimeExports.jsx(PaperCard, { paper }, paper.id.toString()))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-minimal p-16 text-center",
        "data-ocid": "papers-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 border border-border flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-2xl text-foreground mb-2", children: "No papers published yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-7 max-w-sm mx-auto", children: "No papers published yet. Be the first to submit your research." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/",
              className: "button-primary inline-block",
              "data-ocid": "submit-cta",
              children: "Submit a Paper"
            }
          )
        ]
      }
    )
  ] });
}
export {
  LatestPage as default
};
