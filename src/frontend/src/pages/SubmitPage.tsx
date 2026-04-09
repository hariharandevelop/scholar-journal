import { useSubmitPaper } from "@/hooks/use-papers";
import { CheckCircle2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

// ── Error Modal (popup) ──────────────────────────────────────────────────────

function FileTypeModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <dialog
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 w-full h-full max-w-none m-0 p-0 border-0 bg-transparent backdrop:bg-transparent open:flex"
      aria-modal="true"
      aria-label="File type error"
      open
    >
      <div className="bg-background border border-foreground p-8 max-w-sm w-full mx-4">
        <div className="flex items-start gap-4 mb-6">
          <div className="border border-foreground w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
            <span className="font-mono text-sm font-bold text-foreground">
              !
            </span>
          </div>
          <p className="font-body text-sm text-foreground leading-relaxed">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="button-primary w-full"
          data-ocid="modal-close"
        >
          Dismiss
        </button>
      </div>
    </dialog>
  );
}

// ── File Upload Box ──────────────────────────────────────────────────────────

function FileDropZone({
  id,
  label,
  accept,
  acceptLabel,
  file,
  onFile,
  onClear,
  onTypeError,
  dataOcid,
}: {
  id: string;
  label: string;
  accept: string;
  acceptLabel: string;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
  onTypeError: (msg: string) => void;
  dataOcid: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const validate = useCallback(
    (f: File): string | null => {
      const allowedMimes = accept.split(",").map((s) => s.trim());
      const isImage = allowedMimes.some((m) => m.startsWith("image/"));
      const isPdf =
        allowedMimes.includes("application/pdf") ||
        allowedMimes.includes(".pdf");

      if (
        isPdf &&
        !(f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"))
      ) {
        return "Only PDF files are allowed in this area";
      }
      if (isImage && !f.type.startsWith("image/")) {
        return "Only image files (PNG, JPG, GIF) are allowed in this area";
      }
      if (f.size > MAX_FILE_SIZE) {
        return "File exceeds the 20MB size limit. Please choose a smaller file.";
      }
      return null;
    },
    [accept],
  );

  const handle = useCallback(
    (f: File) => {
      const err = validate(f);
      if (err) {
        onTypeError(err);
        return;
      }
      onFile(f);
    },
    [validate, onFile, onTypeError],
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-foreground"
      >
        {label}
      </label>

      {file ? (
        <div
          className="border border-foreground bg-muted/30 px-4 py-4 flex items-center gap-3"
          data-ocid={dataOcid}
        >
          <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-foreground truncate">
              {file.name}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              {formatSize(file.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 border border-border p-1 hover:border-foreground hover:bg-foreground hover:text-background transition-smooth"
            aria-label="Remove file"
            data-ocid={`${dataOcid}-remove`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) handle(f);
          }}
          className={[
            "border border-foreground px-4 py-8 flex flex-col items-center gap-3 w-full cursor-pointer transition-smooth",
            dragging ? "bg-muted" : "bg-background hover:bg-muted/30",
          ].join(" ")}
          data-ocid={dataOcid}
          aria-label={`Upload ${label}`}
        >
          <Upload className="w-6 h-6 text-muted-foreground" />
          <div className="text-center">
            <p className="font-body text-sm text-foreground">
              Drop file here or{" "}
              <span className="underline underline-offset-2">browse</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              {acceptLabel} · Max 20 MB
            </p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handle(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ── Inline Field ─────────────────────────────────────────────────────────────

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  dataOcid,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  dataOcid: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        data-ocid={dataOcid}
        className={`input-minimal w-full focus:outline-none focus:ring-1 focus:ring-foreground ${
          error ? "border-foreground" : ""
        }`}
      />
      {error && (
        <p
          className="font-body text-xs text-foreground font-medium"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

type FieldKey = "fullName" | "email" | "age" | "collegeName";

function validate(
  f: Record<FieldKey, string>,
): Partial<Record<FieldKey, string>> {
  const errs: Partial<Record<FieldKey, string>> = {};
  if (!f.fullName.trim()) errs.fullName = "Full name is required.";
  if (!f.email.trim()) {
    errs.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    errs.email = "Please enter a valid email address.";
  }
  if (!f.age.trim()) {
    errs.age = "Age is required.";
  } else if (
    Number.isNaN(Number(f.age)) ||
    Number(f.age) <= 0 ||
    !Number.isInteger(Number(f.age))
  ) {
    errs.age = "Age must be a positive whole number.";
  }
  if (!f.collegeName.trim())
    errs.collegeName = "College / institution name is required.";
  return errs;
}

export default function SubmitPage() {
  const { mutateAsync, isPending } = useSubmitPaper();

  const [fields, setFields] = useState<Record<FieldKey, string>>({
    fullName: "",
    email: "",
    age: "",
    collegeName: "",
  });
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    fullName: false,
    email: false,
    age: false,
    collegeName: false,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const [submitDone, setSubmitDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = validate(fields);
  const visibleErrors: Partial<Record<FieldKey, string>> = {
    fullName: touched.fullName ? errors.fullName : undefined,
    email: touched.email ? errors.email : undefined,
    age: touched.age ? errors.age : undefined,
    collegeName: touched.collegeName ? errors.collegeName : undefined,
  };

  const allValid =
    Object.keys(errors).length === 0 && !!pdfFile && !!screenshotFile;

  const setField = (key: FieldKey) => (val: string) =>
    setFields((prev) => ({ ...prev, [key]: val }));
  const touchField = (key: FieldKey) => () =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, age: true, collegeName: true });
    if (!allValid) return;
    setSubmitError(null);
    try {
      await mutateAsync({
        submitterName: fields.fullName.trim(),
        submitterEmail: fields.email.trim(),
        submitterAge: Number.parseInt(fields.age, 10),
        collegeName: fields.collegeName.trim(),
        pdfFile: pdfFile!,
        screenshotFile: screenshotFile!,
      });
      setSubmitDone(true);
      setFields({ fullName: "", email: "", age: "", collegeName: "" });
      setTouched({
        fullName: false,
        email: false,
        age: false,
        collegeName: false,
      });
      setPdfFile(null);
      setScreenshotFile(null);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.",
      );
    }
  };

  return (
    <>
      {modalMsg && (
        <FileTypeModal message={modalMsg} onClose={() => setModalMsg(null)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-2">
            <div className="card-minimal p-6">
              <div className="border-b border-border pb-4 mb-6">
                <h1 className="font-display italic text-2xl text-foreground">
                  Submission Form
                </h1>
                <p className="font-body text-xs text-muted-foreground mt-1.5">
                  Submit your research paper for editorial review.
                </p>
              </div>

              {submitDone ? (
                <div className="py-10 text-center" data-ocid="submit-success">
                  <div className="border border-foreground w-12 h-12 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                  </div>
                  <h2 className="font-display italic text-xl text-foreground mb-3">
                    Submission Received
                  </h2>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                    Your paper has been submitted! Thank you for contributing to
                    Scholar Journal.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitDone(false)}
                    className="button-primary"
                    data-ocid="submit-another-btn"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <Field
                    id="fullName"
                    label="Full Name"
                    placeholder="Dr. Jane Smith"
                    value={fields.fullName}
                    onChange={setField("fullName")}
                    onBlur={touchField("fullName")}
                    error={visibleErrors.fullName}
                    dataOcid="input-name"
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@university.edu"
                    value={fields.email}
                    onChange={setField("email")}
                    onBlur={touchField("email")}
                    error={visibleErrors.email}
                    dataOcid="input-email"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      id="age"
                      label="Age"
                      type="number"
                      placeholder="28"
                      value={fields.age}
                      onChange={setField("age")}
                      onBlur={touchField("age")}
                      error={visibleErrors.age}
                      dataOcid="input-age"
                    />
                    <Field
                      id="collegeName"
                      label="College / Institution"
                      placeholder="MIT"
                      value={fields.collegeName}
                      onChange={setField("collegeName")}
                      onBlur={touchField("collegeName")}
                      error={visibleErrors.collegeName}
                      dataOcid="input-college"
                    />
                  </div>

                  {/* PDF Upload */}
                  <FileDropZone
                    id="pdf-upload"
                    label="Research Paper (PDF)"
                    accept="application/pdf,.pdf"
                    acceptLabel="PDF only"
                    file={pdfFile}
                    onFile={setPdfFile}
                    onClear={() => setPdfFile(null)}
                    onTypeError={setModalMsg}
                    dataOcid="upload-pdf"
                  />

                  {/* Screenshot Upload */}
                  <FileDropZone
                    id="screenshot-upload"
                    label="Screenshot / Cover Image"
                    accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                    acceptLabel="PNG, JPG, GIF, WebP"
                    file={screenshotFile}
                    onFile={setScreenshotFile}
                    onClear={() => setScreenshotFile(null)}
                    onTypeError={setModalMsg}
                    dataOcid="upload-screenshot"
                  />

                  {submitError && (
                    <div
                      className="border border-foreground bg-muted px-4 py-3"
                      role="alert"
                      data-ocid="submit-error"
                    >
                      <p className="font-body text-xs text-foreground">
                        {submitError}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!allValid || isPending}
                    className={[
                      "w-full py-3 font-body text-sm font-semibold uppercase tracking-widest border transition-smooth mt-1",
                      allValid && !isPending
                        ? "bg-foreground text-background border-foreground hover:opacity-90 cursor-pointer"
                        : "bg-muted text-muted-foreground border-border cursor-not-allowed",
                    ].join(" ")}
                    data-ocid="submit-btn"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Submitting…
                      </span>
                    ) : (
                      "Submit Paper"
                    )}
                  </button>

                  {!allValid &&
                    (Object.keys(errors).length > 0 ||
                      !pdfFile ||
                      !screenshotFile) && (
                      <p className="font-body text-xs text-muted-foreground text-center -mt-2">
                        {Object.keys(errors).length > 0
                          ? "Please complete all required fields."
                          : "Both files are required before submitting."}
                      </p>
                    )}
                </form>
              )}
            </div>
          </div>

          {/* ── Right: Info Panels ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <details
              className="card-minimal group"
              data-ocid="submission-guidelines"
              open
            >
              <summary className="px-5 py-4 flex items-center justify-between cursor-pointer list-none select-none hover:bg-muted/30 transition-smooth">
                <span className="font-body text-sm font-semibold tracking-wide uppercase">
                  Submission Guidelines
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="px-5 pb-5 border-t border-border pt-4">
                <ul className="font-body text-sm text-muted-foreground space-y-2 list-none">
                  {[
                    "Papers must be original, unpublished research.",
                    "PDF format only — no Word documents.",
                    "Maximum file size: 20 MB.",
                    "Abstract must be 150–300 words.",
                    "All authors must be listed with institutional affiliations.",
                    "Use APA or IEEE citation format.",
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-mono text-xs text-muted-foreground mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <details
              className="card-minimal group"
              data-ocid="required-disclosures"
            >
              <summary className="px-5 py-4 flex items-center justify-between cursor-pointer list-none select-none hover:bg-muted/30 transition-smooth">
                <span className="font-body text-sm font-semibold tracking-wide uppercase">
                  Required Disclosures
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="px-5 pb-5 border-t border-border pt-4">
                <ul className="font-body text-sm text-muted-foreground space-y-2 list-none">
                  {[
                    "Declare any conflicts of interest.",
                    "Confirm that the work is not under review elsewhere.",
                    "Acknowledge all funding sources.",
                    "Confirm ethical approval where applicable.",
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-mono text-xs text-muted-foreground mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="card-minimal group" data-ocid="review-timeline">
              <summary className="px-5 py-4 flex items-center justify-between cursor-pointer list-none select-none hover:bg-muted/30 transition-smooth">
                <span className="font-body text-sm font-semibold tracking-wide uppercase">
                  Review Timeline
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="px-5 pb-5 border-t border-border pt-4">
                <div className="font-body text-sm text-muted-foreground space-y-3">
                  {[
                    { label: "Initial Review", time: "1–3 business days" },
                    { label: "Editorial Decision", time: "7–14 business days" },
                    {
                      label: "Notification Email",
                      time: "Within 24 hours of decision",
                    },
                    {
                      label: "Publication",
                      time: "Immediately upon acceptance",
                    },
                  ].map(({ label, time }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0"
                    >
                      <span className="font-medium text-foreground">
                        {label}
                      </span>
                      <span className="font-mono text-xs">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            <div className="card-minimal px-5 py-4 flex items-center gap-3">
              <div className="w-2 h-2 border border-muted-foreground shrink-0" />
              <p className="font-body text-xs text-muted-foreground">
                Accepted papers appear automatically on the{" "}
                <a
                  href="/latest"
                  className="font-semibold text-foreground underline underline-offset-2"
                >
                  Latest Papers
                </a>{" "}
                page once reviewed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
