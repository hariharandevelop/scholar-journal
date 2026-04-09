import { r as reactExports, j as jsxRuntimeExports, R as React } from "./index-D8UIE2Qr.js";
import { a as clsx, c as cn } from "./utils-2v2HxlWs.js";
import { b as useAdminLogin, c as useAllSubmissions, d as useAdminApprove, e as useAdminReject, S as SubmissionStatus } from "./use-papers-SmsmIgIY.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const ADMIN_KEY = "adminLoggedIn";
const ADMIN_PASSWORD = "admin123";
function statusLabel(status) {
  if (status === SubmissionStatus.pending) return "PENDING";
  if (status === SubmissionStatus.approved) return "APPROVED";
  return "REJECTED";
}
function statusClass(status) {
  if (status === SubmissionStatus.pending)
    return "bg-foreground text-background border-foreground";
  if (status === SubmissionStatus.approved)
    return "bg-background text-foreground border-foreground";
  return "bg-muted text-muted-foreground border-border";
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function LoginScreen({ onLogin }) {
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const { mutateAsync, isPending, actorLoading } = useAdminLogin();
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }, []);
  async function handleSubmit(e) {
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
      const msg = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(msg);
    }
  }
  const isConnecting = actorLoading && !isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm border border-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground text-background px-6 py-4 border-b border-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-body text-sm font-bold tracking-widest uppercase", children: "Admin Access" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "bg-background p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "admin-password",
            className: "font-body text-xs font-semibold tracking-widest uppercase text-foreground block",
            children: "Password"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "admin-password",
            ref: inputRef,
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Enter admin password",
            className: "rounded-none border-foreground bg-background font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground",
            "data-ocid": "admin-password-input"
          }
        )
      ] }),
      isConnecting && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs tracking-wide text-muted-foreground border border-border px-3 py-2 animate-pulse", children: "Connecting to backend…" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-body text-xs font-semibold tracking-wide text-foreground border border-foreground px-3 py-2",
          role: "alert",
          "data-ocid": "admin-login-error",
          children: error
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isPending || !password || actorLoading,
          className: "w-full rounded-none bg-foreground text-background hover:bg-foreground/90 font-body text-xs font-bold tracking-widest uppercase h-10 border border-foreground disabled:opacity-40",
          "data-ocid": "admin-login-btn",
          children: isConnecting ? "CONNECTING…" : isPending ? "VERIFYING…" : "LOGIN"
        }
      )
    ] })
  ] }) });
}
function SubmissionRow({
  sub,
  onApprove,
  onReject,
  isActing
}) {
  const isPending = sub.status === SubmissionStatus.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/20 transition-smooth",
      "data-ocid": "submission-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-sm text-foreground font-medium", children: sub.submitterName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell", children: sub.submitterEmail }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-body text-xs text-muted-foreground hidden lg:table-cell truncate max-w-[180px]", children: sub.collegeName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground hidden sm:table-cell", children: formatDate(sub.submittedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: `rounded-none text-[10px] font-bold tracking-widest border ${statusClass(sub.status)}`,
            children: statusLabel(sub.status)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onApprove(sub.id),
              disabled: isActing,
              className: "font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-foreground bg-foreground text-background hover:bg-foreground/80 transition-smooth disabled:opacity-40",
              "data-ocid": "approve-btn",
              children: "APPROVE"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onReject(sub.id),
              disabled: isActing,
              className: "font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-border bg-background text-foreground hover:bg-muted/30 transition-smooth disabled:opacity-40",
              "data-ocid": "reject-btn",
              children: "REJECT"
            }
          )
        ] }) })
      ]
    }
  );
}
function Dashboard({ onLogout }) {
  const { data: submissions = [], isLoading, refetch } = useAllSubmissions();
  const approveMutation = useAdminApprove();
  const rejectMutation = useAdminReject();
  const [actionError, setActionError] = reactExports.useState("");
  const pending = submissions.filter(
    (s) => s.status === SubmissionStatus.pending
  );
  const sorted = [...submissions].sort((a, b) => {
    if (a.status === SubmissionStatus.pending && b.status !== SubmissionStatus.pending)
      return -1;
    if (a.status !== SubmissionStatus.pending && b.status === SubmissionStatus.pending)
      return 1;
    return Number(b.submittedAt - a.submittedAt);
  });
  const isActing = approveMutation.isPending || rejectMutation.isPending;
  async function handleApprove(id) {
    if (!window.confirm("Approve this paper submission?")) return;
    setActionError("");
    try {
      const result = await approveMutation.mutateAsync({
        submissionId: id,
        adminPassword: ADMIN_PASSWORD
      });
      if (!result.ok) setActionError(result.message);
    } catch {
      setActionError("Failed to approve. Please try again.");
    }
  }
  async function handleReject(id) {
    if (!window.confirm("Reject this paper submission?")) return;
    setActionError("");
    try {
      const result = await rejectMutation.mutateAsync({
        submissionId: id,
        adminPassword: ADMIN_PASSWORD
      });
      if (!result.ok) setActionError(result.message);
    } catch {
      setActionError("Failed to reject. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border border-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground text-background px-6 py-4 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-body text-sm font-bold tracking-widest uppercase", children: "Admin Dashboard" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
          pending.length,
          " pending"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void refetch(),
            className: "font-body text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth",
            "data-ocid": "refresh-btn",
            children: "REFRESH"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onLogout,
            className: "font-body text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 border border-foreground bg-background text-foreground hover:bg-muted/30 transition-smooth",
            "data-ocid": "logout-btn",
            children: "LOGOUT"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 border border-border", children: [
      { label: "TOTAL", value: submissions.length },
      { label: "PENDING", value: pending.length },
      {
        label: "APPROVED",
        value: submissions.filter(
          (s) => s.status === SubmissionStatus.approved
        ).length
      }
    ].map(({ label, value }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `px-6 py-4 ${i < 2 ? "border-r border-border" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[10px] font-bold tracking-widest uppercase text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-3xl font-bold text-foreground mt-1", children: value })
        ]
      },
      label
    )) }),
    actionError && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-body text-xs font-semibold border border-foreground px-4 py-3 text-foreground",
        role: "alert",
        "data-ocid": "action-error",
        children: actionError
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-body text-[10px] font-bold tracking-widest uppercase text-muted-foreground", children: "All Submissions" }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "px-4 py-8 text-center font-body text-sm text-muted-foreground tracking-widest uppercase animate-pulse",
          "data-ocid": "submissions-loading",
          children: "Loading submissions…"
        }
      ) : submissions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-12 text-center", "data-ocid": "empty-submissions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground tracking-widest uppercase", children: "No submissions yet" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/20", children: ["Name", "Email", "College", "Date", "Status", "Action"].map(
            (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-4 py-2 text-left font-body text-[10px] font-bold tracking-widest uppercase text-muted-foreground",
                children: h
              },
              h
            )
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SubmissionRow,
            {
              sub,
              onApprove: handleApprove,
              onReject: handleReject,
              isActing
            },
            String(sub.id)
          )) })
        ] }),
        pending.length === 0 && submissions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-6 text-center border-t border-border",
            "data-ocid": "no-pending",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground tracking-widest uppercase", children: "No pending submissions" })
          }
        )
      ] })
    ] })
  ] });
}
function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = reactExports.useState(() => {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginScreen, { onLogin: handleLogin });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, { onLogout: handleLogout });
}
export {
  AdminPage as default
};
