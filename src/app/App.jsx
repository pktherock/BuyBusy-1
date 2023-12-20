import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import appRoutes from "./app.routes";
import { AuthContextProvider } from "./contexts";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer newestOnTop />
      <RouterProvider router={appRoutes} />
    </AuthContextProvider>
  );
}

export default App;
