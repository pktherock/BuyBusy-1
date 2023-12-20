import { Navigate, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components";
import { PrivateLayout, PublicLayout } from "./layouts";

import AuthRoutes from "./features/auth/auth.routes";
import HomeRoutes from "./features/home/home.routes";
import CanActivate from "./guards/CanActivate";
import { CartRoutes } from "./features/cart";

const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/auth" />,
  },

  {
    path: "/auth",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [...AuthRoutes],
  },

  {
    path: "/home",
    element: (
      <CanActivate authentication>
        <PrivateLayout />
      </CanActivate>
    ),
    errorElement: <ErrorPage />,
    children: [...HomeRoutes],
  },
  {
    path: "/cart",
    element: (
      <CanActivate authentication>
        <PrivateLayout />
      </CanActivate>
    ),
    errorElement: <ErrorPage />,
    children: [...CartRoutes],
  },
]);

export default appRoutes;
