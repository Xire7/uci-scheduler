import "./App.css";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatorDetail, { loadCreator } from "./routes/CourseDetails.jsx";
import AddCreator from "./routes/AddCourse";
import RootLayout from "./components/RootLayout";
import HomePage, { loadCreators } from "./routes/HomePage";
import EditCreator from "./routes/EditCourse";
import { manipulateCreatorAction } from "./components/CourseForm";

function App() {
  let ids = [];  // this isn't done yet, finish this after denny's. whole point is making sure IDs never duplicate

  const updateIDHandler = (updatedIDList) => {
    ids = updatedIDList; // this isn't done yet, finish this after denny's. whole point is making sure IDs never duplicate
    console.log(ids);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage update={updateIDHandler}/>,  // this isn't done yet, finish this after denny's. whole point is making sure IDs never duplicate
          loader: loadCreators,
        },
        {
          path: ":creatorId",
          loader: loadCreator,
          id: "fetchCreator",
          children: [
            {
              index: true,
              element: <CreatorDetail />,
              action: manipulateCreatorAction,
            },
            {
              path: "edit",
              element: <EditCreator />,
              action: manipulateCreatorAction,
            },
          ],
        },
        {
          path: "new",
          element: <AddCreator idCheck={ids}/>,  // this isn't done yet, finish this after denny's. whole point is making sure IDs never duplicate
          action: manipulateCreatorAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
