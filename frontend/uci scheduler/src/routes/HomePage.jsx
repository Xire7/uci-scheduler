// home page should render creator list, which renders creator cards
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../client";
import CreatorList from "../components/CourseList";

const HomePage = ({ update }) => {
  const data = useLoaderData();
  const idArr = [];
  const fetchIDs = (data) => {
    for (let i = 0; i < data.length; ++i) {
      idArr.push(data[i].id);
    }
    update(idArr);
  };
  fetchIDs(data);
  return (
    <>
      <h1>The Creatorverse</h1>
      <CreatorList creatorList={data} />
    </>
  );
};

export default HomePage;
export const loadCreators = async () => {
  const response = await fetch(
    "https://rnoxkhhmdlohjaiyxyhg.supabase.co/rest/v1/creators",
    {
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k",
      },
    },
    { method: "GET" }
  );
  return response.json();
};
