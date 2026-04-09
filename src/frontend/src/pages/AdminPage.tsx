import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import {
  useAdminApprove,
  useAdminLogin,
  useAdminReject,
  useAllSubmissions,
} from "../hooks/use-papers";
import { SubmissionStatus } from "../types";

const ADMIN_KEY = "adminLoggedIn";
const ADMIN_PASSWORD = "admin123";

function statusLabel(status: SubmissionStatus): string {
  if (status === SubmissionStatus.pending) return "PENDING";
  if (status === SubmissionStatus.approved) return "APPROVED";
  return "REJECTED";
}

function statusClass(status: SubmissionStatus): string {
  if (status === SubmissionStatus.pending)
    return "bg-foreground text-background border-foreground";
  if (status === SubmissionStatus.approved)
    return "bg-background text-foreground border-foreground";
  return "bg-muted text-muted-foreground border-border";
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── Login screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync, isPending, actorLoading } = useAdminLogin();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (actorLoading) {
      setError("Connecting to backend — please wait a moment and try again.");
      return;
    }
    try {
      const ok = await mutateAsync(password);
      if (ok) {
        localStorage.setItem(ADMIN_KEY, "true");
        onLogin();
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(msg);
    }
  }

  const isConnecting = actorLoading && !isPending;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-foreground">
        {/* Title bar */}
        <div className="bg-foreground text-background px-6 py-4 border-b border-foreground">
          <h1 className="font-body text-sm font-bold tracking-widest uppercase">
            Admin Access
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-background p-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="admin-password"
              className="font-body text-xs font-semibold tracking-widest uppercase text-foreground block"
            >
              Password
            </label>
            <Input
              id="admin-password"
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="rounded-none border-foreground bg-background font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground"
              data-ocid="admin-password-input"
            />
          </div>

          {isConnecting && (
            <p className="font-body text-xs tracking-wide text-muted-foreground border border-border px-3 py-2 animate-pulse">
              Connecting to backend…
            </p>
          )}

          {error && (
            <p
              className="font-body text-xs font-semibold tracking-wide text-foreground border border-foreground px-3 py-2"
              role="alert"
              data-ocid="admin-login-error"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending || !password || actorLoading}
            className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90 font-body text-xs font-bold tracking-widest uppercase h-10 border border-foreground disabled:opacity-40"
            data-ocid="admin-login-btn"
          >
            {isConnecting ? "CONNECTING…" : isPending ? "VERIFYING…" : "LOGIN"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Submission row ─────────────────────────────────────────────────────────────

interface SubmissionRowProps {
  sub: {
    id: bigint;
    submitterName: string;
    submitterEmail: string;
    collegeName: string;
    submittedAt: bigint;
    status: SubmissionStatus;
  };
  onApprove: (id: bigint) => void;
  onReject: (id: bigint) => void;
  isActing: boolean;
}

function SubmissionRow({
  sub,
  onApprove,
  onReject,
  isActing,
}: SubmissionRowProps) {
  const isPending = sub.status === SubmissionStatus.pending;

  return (
    <tr
      className="border-b border-border hover:bg-muted/20 transition-smooth"
      data-ocid="submission-row"
    >
      <td className="px-4 py-3 font-body text-sm text-foreground font-medium">
        {sub.submitterName}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">
        {sub.submitterEmail}
      </td>
      <td className="px-4 py-3 font-body text-xs text-muted-foreground hidden lg:table-cell truncate max-w-[180px]">
        {sub.collegeName}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell">
        {formatDate(sub.submittedAt)}
      </td>
      <td className="px-4 py-3">
        <Badge
          className={`rounded-none text-[10px] font-bold tracking-widest border ${statusClass(sub.status)}`}
        >
          {statusLabel(sub.status)}
        </Badge>
      </td>
      <td className="px-4 py-3">
        {isPending && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onApprove(sub.id)}
              disabled={isActing}
              className="font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-foreground bg-foreground text-background hover:bg-foreground/80 transition-smooth disabled:opacity-40"
              data-ocid="approve-btn"
            >
              APPROVE
            </button>
            <button
              type="button"
              onClick={() => onReject(sub.id)}
              disabled={isActing}
              className="font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-border bg-background text-foreground hover:bg-muted/30 transition-smooth disabled:opacity-40"
              data-ocid="reject-btn"
            >
              REJECT
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data: submissions = [], isLoading, refetch } = useAllSubmissions();
  const approveMutation = useAdminApprove();
  const rejectMutation = useAdminReject();
  const [actionError, setActionError] = useState("");

  const pending = submissions.filter(
    (s) => s.status === SubmissionStatus.pending,
  );

  // Sort: pending first, then others newest-first
  const sorted = [...submissions].sort((a, b) => {
    if (
      a.status === SubmissionStatus.pending &&
      b.status !== SubmissionStatus.pending
    )
      return -1;
    if (
      a.status !== SubmissionStatus.pending &&
      b.status === SubmissionStatus.pending
    )
      return 1;
    return Number(b.submittedAt - a.submittedAt);
  });

  const isActing = approveMutation.isPending || rejectMutation.isPending;

  async function handleApprove(id: bigint) {
    if (!window.confirm("Approve this paper submission?")) return;
    setActionError("");
    try {
      const result = await approveMutation.mutateAsync({
        submissionId: id,
        adminPassword: ADMIN_PASSWORD,
      });
      if (!result.ok) setActionError(result.message);
    } catch {
      setActionError("Failed to approve. Please try again.");
    }
  }

  async function handleReject(id: bigint) {
    if (!window.confirm("Reject this paper submission?")) return;
    setActionError("");
    try {
      const result = await rejectMutation.mutateAsync({
        submissionId: id,
        adminPassword: ADMIN_PASSWORD,
      });
      if (!result.ok) setActionError(result.message);
    } catch {
      setActionError("Failed to reject. Please try again.");
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between border border-foreground">
        <div className="bg-foreground text-background px-6 py-4 flex-1">
          <h1 className="font-body text-sm font-bold tracking-widest uppercase">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4 px-6">
          <span className="font-mono text-xs text-muted-foreground">
            {pending.length} pending
          </span>
          <button
            type="button"
            onClick={() => void refetch()}
            className="font-body text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth"
            data-ocid="refresh-btn"
          >
            REFRESH
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="font-body text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 border border-foreground bg-background text-foreground hover:bg-muted/30 transition-smooth"
            data-ocid="logout-btn"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border border-border">
        {[
          { label: "TOTAL", value: submissions.length },
          { label: "PENDING", value: pending.length },
          {
            label: "APPROVED",
            value: submissions.filter(
              (s) => s.status === SubmissionStatus.approved,
            ).length,
          },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            className={`px-6 py-4 ${i < 2 ? "border-r border-border" : ""}`}
          >
            <p className="font-body text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              {label}
            </p>
            <p className="font-mono text-3xl font-bold text-foreground mt-1">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Error */}
      {actionError && (
        <p
          className="font-body text-xs font-semibold border border-foreground px-4 py-3 text-foreground"
          role="alert"
          data-ocid="action-error"
        >
          {actionError}
        </p>
      )}

      {/* Table */}
      <div className="border border-border">
        <div className="bg-muted/40 border-b border-border px-4 py-3">
          <h2 className="font-body text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
            All Submissions
          </h2>
        </div>

        {isLoading ? (
          <div
            className="px-4 py-8 text-center font-body text-sm text-muted-foreground tracking-widest uppercase animate-pulse"
            data-ocid="submissions-loading"
          >
            Loading submissions…
          </div>
        ) : submissions.length === 0 ? (
          <div className="px-4 py-12 text-center" data-ocid="empty-submissions">
            <p className="font-body text-sm text-muted-foreground tracking-widest uppercase">
              No submissions yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {["Name", "Email", "College", "Date", "Status", "Action"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-2 text-left font-body text-[10px] font-bold tracking-widest uppercase text-muted-foreground"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {sorted.map((sub) => (
                  <SubmissionRow
                    key={String(sub.id)}
                    sub={sub}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    isActing={isActing}
                  />
                ))}
              </tbody>
            </table>

            {pending.length === 0 && submissions.length > 0 && (
              <div
                className="px-4 py-6 text-center border-t border-border"
                data-ocid="no-pending"
              >
                <p className="font-body text-xs text-muted-foreground tracking-widest uppercase">
                  No pending submissions
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── AdminPage ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_KEY) === "true";
  });

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_KEY);
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
