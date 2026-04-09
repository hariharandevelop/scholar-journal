import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const SubmitPage = lazy(() => import("./pages/SubmitPage"));
const LatestPage = lazy(() => import("./pages/LatestPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="font-body text-sm text-muted-foreground tracking-widest uppercase animate-pulse">
        Loading…
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SubmitPage,
});

const latestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/latest",
  component: LatestPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([submitRoute, latestRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
