import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import appRoutes from "./app.routes";
import { AuthContextProvider } from "./contexts";
import "./App.css";
import { CartContextProvider } from "./features/cart";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer newestOnTop />
      <CartContextProvider>
        <RouterProvider router={appRoutes} />
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
