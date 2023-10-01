import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Account from "../routes/Account.jsx";
import HomePage, { loadCourses } from "../routes/HomePage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
          loader: loadCourses,
          children: [{ path: "account", element: <Account /> }],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
