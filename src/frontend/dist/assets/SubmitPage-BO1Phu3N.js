import { r as reactExports, j as jsxRuntimeExports } from "./index-D8UIE2Qr.js";
import { u as useSubmitPaper } from "./use-papers-SmsmIgIY.js";
import { c as createLucideIcon } from "./createLucideIcon-Ch5jP8Jr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const MAX_FILE_SIZE = 20 * 1024 * 1024;
function FileTypeModal({
  message,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 w-full h-full max-w-none m-0 p-0 border-0 bg-transparent backdrop:bg-transparent open:flex",
      "aria-modal": "true",
      "aria-label": "File type error",
      open: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-foreground p-8 max-w-sm w-full mx-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-foreground w-8 h-8 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-foreground", children: "!" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground leading-relaxed", children: message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "button-primary w-full",
            "data-ocid": "modal-close",
            children: "Dismiss"
          }
        )
      ] })
    }
  );
}
function FileDropZone({
  id,
  label,
  accept,
  acceptLabel,
  file,
  onFile,
  onClear,
  onTypeError,
  dataOcid
}) {
  const inputRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const validate2 = reactExports.useCallback(
    (f) => {
      const allowedMimes = accept.split(",").map((s) => s.trim());
      const isImage = allowedMimes.some((m) => m.startsWith("image/"));
      const isPdf = allowedMimes.includes("application/pdf") || allowedMimes.includes(".pdf");
      if (isPdf && !(f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"))) {
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
    [accept]
  );
  const handle = reactExports.useCallback(
    (f) => {
      const err = validate2(f);
      if (err) {
        onTypeError(err);
        return;
      }
      onFile(f);
    },
    [validate2, onFile, onTypeError]
  );
  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "font-body text-sm font-medium text-foreground",
        children: label
      }
    ),
    file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-foreground bg-muted/30 px-4 py-4 flex items-center gap-3",
        "data-ocid": dataOcid,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground truncate", children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground mt-0.5", children: formatSize(file.size) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClear,
              className: "shrink-0 border border-border p-1 hover:border-foreground hover:bg-foreground hover:text-background transition-smooth",
              "aria-label": "Remove file",
              "data-ocid": `${dataOcid}-remove`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        onDragOver: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: () => setDragging(false),
        onDrop: (e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handle(f);
        },
        className: [
          "border border-foreground px-4 py-8 flex flex-col items-center gap-3 w-full cursor-pointer transition-smooth",
          dragging ? "bg-muted" : "bg-background hover:bg-muted/30"
        ].join(" "),
        "data-ocid": dataOcid,
        "aria-label": `Upload ${label}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-foreground", children: [
              "Drop file here or",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline underline-offset-2", children: "browse" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground mt-1", children: [
              acceptLabel,
              " · Max 20 MB"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        id,
        type: "file",
        accept,
        className: "sr-only",
        onChange: (e) => {
          var _a;
          const f = (_a = e.target.files) == null ? void 0 : _a[0];
          if (f) handle(f);
          e.target.value = "";
        }
      }
    )
  ] });
}
function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "font-body text-sm font-medium text-foreground",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type,
        placeholder,
        value,
        onChange: (e) => onChange(e.target.value),
        onBlur,
        "data-ocid": dataOcid,
        className: `input-minimal w-full focus:outline-none focus:ring-1 focus:ring-foreground ${error ? "border-foreground" : ""}`
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-body text-xs text-foreground font-medium",
        role: "alert",
        children: error
      }
    )
  ] });
}
function validate(f) {
  const errs = {};
  if (!f.fullName.trim()) errs.fullName = "Full name is required.";
  if (!f.email.trim()) {
    errs.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    errs.email = "Please enter a valid email address.";
  }
  if (!f.age.trim()) {
    errs.age = "Age is required.";
  } else if (Number.isNaN(Number(f.age)) || Number(f.age) <= 0 || !Number.isInteger(Number(f.age))) {
    errs.age = "Age must be a positive whole number.";
  }
  if (!f.collegeName.trim())
    errs.collegeName = "College / institution name is required.";
  return errs;
}
function SubmitPage() {
  const { mutateAsync, isPending } = useSubmitPaper();
  const [fields, setFields] = reactExports.useState({
    fullName: "",
    email: "",
    age: "",
    collegeName: ""
  });
  const [touched, setTouched] = reactExports.useState({
    fullName: false,
    email: false,
    age: false,
    collegeName: false
  });
  const [pdfFile, setPdfFile] = reactExports.useState(null);
  const [screenshotFile, setScreenshotFile] = reactExports.useState(null);
  const [modalMsg, setModalMsg] = reactExports.useState(null);
  const [submitDone, setSubmitDone] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState(null);
  const errors = validate(fields);
  const visibleErrors = {
    fullName: touched.fullName ? errors.fullName : void 0,
    email: touched.email ? errors.email : void 0,
    age: touched.age ? errors.age : void 0,
    collegeName: touched.collegeName ? errors.collegeName : void 0
  };
  const allValid = Object.keys(errors).length === 0 && !!pdfFile && !!screenshotFile;
  const setField = (key) => (val) => setFields((prev) => ({ ...prev, [key]: val }));
  const touchField = (key) => () => setTouched((prev) => ({ ...prev, [key]: true }));
  const handleSubmit = async (e) => {
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
        pdfFile,
        screenshotFile
      });
      setSubmitDone(true);
      setFields({ fullName: "", email: "", age: "", collegeName: "" });
      setTouched({
        fullName: false,
        email: false,
        age: false,
        collegeName: false
      });
      setPdfFile(null);
      setScreenshotFile(null);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Submission failed. Please try again."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    modalMsg && /* @__PURE__ */ jsxRuntimeExports.jsx(FileTypeModal, { message: modalMsg, onClose: () => setModalMsg(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-minimal p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border pb-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display italic text-2xl text-foreground", children: "Submission Form" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-1.5", children: "Submit your research paper for editorial review." })
        ] }),
        submitDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-10 text-center", "data-ocid": "submit-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-foreground w-12 h-12 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-xl text-foreground mb-3", children: "Submission Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed mb-6", children: "Your paper has been submitted! Thank you for contributing to Scholar Journal." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSubmitDone(false),
              className: "button-primary",
              "data-ocid": "submit-another-btn",
              children: "Submit Another"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex flex-col gap-5",
            noValidate: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  id: "fullName",
                  label: "Full Name",
                  placeholder: "Dr. Jane Smith",
                  value: fields.fullName,
                  onChange: setField("fullName"),
                  onBlur: touchField("fullName"),
                  error: visibleErrors.fullName,
                  dataOcid: "input-name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  id: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "you@university.edu",
                  value: fields.email,
                  onChange: setField("email"),
                  onBlur: touchField("email"),
                  error: visibleErrors.email,
                  dataOcid: "input-email"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    id: "age",
                    label: "Age",
                    type: "number",
                    placeholder: "28",
                    value: fields.age,
                    onChange: setField("age"),
                    onBlur: touchField("age"),
                    error: visibleErrors.age,
                    dataOcid: "input-age"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
                  {
                    id: "collegeName",
                    label: "College / Institution",
                    placeholder: "MIT",
                    value: fields.collegeName,
                    onChange: setField("collegeName"),
                    onBlur: touchField("collegeName"),
                    error: visibleErrors.collegeName,
                    dataOcid: "input-college"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FileDropZone,
                {
                  id: "pdf-upload",
                  label: "Research Paper (PDF)",
                  accept: "application/pdf,.pdf",
                  acceptLabel: "PDF only",
                  file: pdfFile,
                  onFile: setPdfFile,
                  onClear: () => setPdfFile(null),
                  onTypeError: setModalMsg,
                  dataOcid: "upload-pdf"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FileDropZone,
                {
                  id: "screenshot-upload",
                  label: "Screenshot / Cover Image",
                  accept: "image/png,image/jpeg,image/jpg,image/gif,image/webp",
                  acceptLabel: "PNG, JPG, GIF, WebP",
                  file: screenshotFile,
                  onFile: setScreenshotFile,
                  onClear: () => setScreenshotFile(null),
                  onTypeError: setModalMsg,
                  dataOcid: "upload-screenshot"
                }
              ),
              submitError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "border border-foreground bg-muted px-4 py-3",
                  role: "alert",
                  "data-ocid": "submit-error",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-foreground", children: submitError })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: !allValid || isPending,
                  className: [
                    "w-full py-3 font-body text-sm font-semibold uppercase tracking-widest border transition-smooth mt-1",
                    allValid && !isPending ? "bg-foreground text-background border-foreground hover:opacity-90 cursor-pointer" : "bg-muted text-muted-foreground border-border cursor-not-allowed"
                  ].join(" "),
                  "data-ocid": "submit-btn",
                  children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        className: "animate-spin w-3.5 h-3.5",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
                      }
                    ),
                    "Submitting…"
                  ] }) : "Submit Paper"
                }
              ),
              !allValid && (Object.keys(errors).length > 0 || !pdfFile || !screenshotFile) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground text-center -mt-2", children: Object.keys(errors).length > 0 ? "Please complete all required fields." : "Both files are required before submitting." })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "details",
          {
            className: "card-minimal group",
            "data-ocid": "submission-guidelines",
            open: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "px-5 py-4 flex items-center justify-between cursor-pointer list-none select-none hover:bg-muted/30 transition-smooth", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-semibold tracking-wide uppercase", children: "Submission Guidelines" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-open:hidden", children: "+" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden group-open:inline", children: "−" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 border-t border-border pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "font-body text-sm text-muted-foreground space-y-2 list-none", children: [
                "Papers must be original, unpublished research.",
                "PDF format only — no Word documents.",
                "Maximum file size: 20 MB.",
                "Abstract must be 150–300 words.",
                "All authors must be listed with institutional affiliations.",
                "Use APA or IEEE citation format."
              ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground mt-0.5", children: String(i + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
              ] }, item)) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "details",
          {
            className: "card-minimal group",
            "data-ocid": "required-disclosures",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "px-5 py-4 flex items-center justify-between cursor-pointer list-none select-none hover:bg-muted/30 transition-smooth", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-semibold tracking-wide uppercase", children: "Required Disclosures" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-open:hidden", children: "+" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden group-open:inline", children: "−" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 border-t border-border pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "font-body text-sm text-muted-foreground space-y-2 list-none", children: [
                "Declare any conflicts of interest.",
                "Confirm that the work is not under review elsewhere.",
                "Acknowledge all funding sources.",
                "Confirm ethical approval where applicable."
              ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground mt-0.5", children: String(i + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
              ] }, item)) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "card-minimal group", "data-ocid": "review-timeline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "px-5 py-4 flex items-center justify-between cursor-pointer list-none select-none hover:bg-muted/30 transition-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-semibold tracking-wide uppercase", children: "Review Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-open:hidden", children: "+" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden group-open:inline", children: "−" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 border-t border-border pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-body text-sm text-muted-foreground space-y-3", children: [
            { label: "Initial Review", time: "1–3 business days" },
            { label: "Editorial Decision", time: "7–14 business days" },
            {
              label: "Notification Email",
              time: "Within 24 hours of decision"
            },
            {
              label: "Publication",
              time: "Immediately upon acceptance"
            }
          ].map(({ label, time }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: time })
              ]
            },
            label
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-minimal px-5 py-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 border border-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground", children: [
            "Accepted papers appear automatically on the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/latest",
                className: "font-semibold text-foreground underline underline-offset-2",
                children: "Latest Papers"
              }
            ),
            " ",
            "page once reviewed."
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SubmitPage as default
};
