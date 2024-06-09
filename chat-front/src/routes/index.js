import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { element: <Login />, path: "login" },
        { element: <Signup />, path: "signup" },
        { element: <ResetPassword />, path: "reset-password" },
        { element: <ChangePassword />, path: "change-password" },
        { element: <EmailVerification />, path: "email-verification" },

      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <Group /> },
        { path: "call-history", element: <CallHistory /> },
        { path: "profile-setup", element: <ProfileSetup /> },
        { path: "meeting-view", element: <Meeting /> },



        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const Settings = Loadable(
    lazy(() => import("../pages/dashboard/Settings")),
);

const Login = Loadable(
    lazy(() => import("../pages/auth/Login")),
);

const Signup = Loadable(
    lazy(() => import("../pages/auth/Signup")),
);

const ResetPassword = Loadable(
    lazy(() => import("../pages/auth/ResetPassword")),
);

const ChangePassword = Loadable(
    lazy(() => import("../pages/auth/ChangePassword")),
);

const ProfileSetup = Loadable(
    lazy(() => import("../pages/dashboard/ProfileSetup")),
);

const Group = Loadable(
    lazy(() => import("../pages/dashboard/Group")),
);


const CallHistory = Loadable(
    lazy(() => import("../pages/dashboard/CallHistory")),
);
const EmailVerification = Loadable(
    lazy(() => import("../pages/auth/EmailVerification")),
);

const Meeting = Loadable(
    lazy(() => import("../pages/dashboard/videosdk/meeting")),
);

const Page404 = Loadable(lazy(() => import("../pages/Page404")));
