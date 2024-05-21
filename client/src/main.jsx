import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./routes/AdminLogin.jsx";
import ErrorRoute from "./routes/ErrorRoute.jsx";
import AdminPage from "./routes/AdminPage.jsx";
import Search_a_Name from "./components/Search_a_Name.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorRoute/>
  },
  {
    path: "/admin",
    element: <AdminLogin />,
    errorElement:<ErrorRoute/>
  },
  {
    path: "/adminPage",
    element: <AdminPage />,
    errorElement:<ErrorRoute/>
  },
  {
    path: "/test",
    element:<Search_a_Name/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
