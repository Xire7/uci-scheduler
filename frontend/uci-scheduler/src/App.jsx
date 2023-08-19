import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import CourseSearchPage from "../routes/CourseSearch";
import CourseDetails from "../routes/CourseDetails";
import HomePage from "../routes/HomePage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "courseSearch",
          element: <CourseSearchPage />,
          children: [
            {
              path: ":/courseName",
              element: <CourseDetails />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
