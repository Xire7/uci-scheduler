require("dotenv").config();
const { text } = require("express");
const {pineconeUpsert} = require('./pineconeupsert');

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const createEmbeddings = async (token, model, input) => {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ input, model }),
  });
  const { error, data, usage } = await response.json();
  if (error) {
    console.log(error);
  }
  return data;
};

const getCoursesInfo = async () => {
  try {
    const response = await fetch(
      "https://api.peterportal.org/rest/v0/courses/all", {method: "GET"}
    );
    if (!response.ok) {
      console.log("ERROR, could not retrieve course info");
      throw new Error("Not ok response");
    }
    return response.json();
  } catch (err) {
    console.log("ERROR IN:", err);
  }
};

// idea is to present pinecone an object with metadata, id, and embedded vector
const coursesToPineCone = async () => {
  const allCourses = await getCoursesInfo();

  const courseList = {};
  courseList.vectors = [];

  for (let i = 0; i < allCourses.length; ++i) {
    if (i % 3000 == 0 && i != 0) {
      console.log("Making sure abides by OpenAI 3000 RPM limit");
      await sleep(30000);
    }
    try {
      let courseDict = {};
      courseDict.id = allCourses[i].id;
      courseDict.metadata = {
        title: allCourses[i].title,
        department: allCourses[i].department,
        description: allCourses[i].description,
      };
      let textIdentifier = `${allCourses[i].id } ${allCourses[i].title}. ${allCourses[i].description}`;
      textIdentifier = textIdentifier.replace("\n", " ");
      courseDict.values = await createEmbeddings(
          process.env.OPENAI_API_KEY,
          "text-embedding-ada-002",
          textIdentifier
        );
      console.log(courseDict.id, "|", textIdentifier) // so i can see what's going on
      courseList.vectors.push(courseDict);
    } catch (err) {
      console.log("Error in", err);
    }
  }
  return (courseList);
};

// program flow: get uci data
// encode them all into embeds and upsert into pinecone
// use pinecone to find closest K vectors by querying embedded vector which has metadata that is accessible --> see helpers.py
// append all matches to a course list then serve on frontend
const embedCourses = async () => {
  const courseList = await coursesToPineCone();
  await pineconeUpsert(courseList);
};

module.exports = {
  embedCourses, 
  createEmbeddings
};
