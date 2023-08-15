require("dotenv").config();

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

// const vector = await createEmbeddings({
//   token: process.env.OPENAI_API_KEY,
//   model: "text-embedding-ada-002",
//   input: "What is an embedding?",
// });

const query = async ({ token, vector, namespace }) => {
  const response = await fetch(
    "https://courses-7409d23.svc.asia-southeast1-gcp-free.pinecone.io/query",
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": token,
      },
      method: "POST",
      body: JSON.stringify({
        vector,
        namespace,
        topK: 10,
        includeMetadata: true,
      }),
    }
  );

  const data = await response.json();
  return data.matches.map((match) => match.metadata);
};

// const metadata = await query({
//   token: process.env.PINECONE_API_KEY,
//   vector: vector, //  Here's the vector we received from `createEmbeddings()`
//   namespace: "my-knowledge-base",
// });

const getCoursesInfo = async () => {
  try {
    const response = await fetch(
      "https://api.peterportal.org/rest/v0/courses/all", {method: "GET"}
    );
    if (!response.ok) {
      console.log("ERROR, could not retrieve course info");
      throw new Error("Not ok response");
    }
    console.log("Works");
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

  for (let i = 0; i < 3; ++i) {
    if (i % 3 == 0 && i != 0) {
      console.log("Making sure abides by OpenAI 3000 RPM limit");
    }
    try {
      let courseDict = {};
      courseDict.id = allCourses[i].id;
      courseDict.metadata = {
        title: allCourses[i].title,
        department: allCourses[i].department,
        description: allCourses[i].description,
      };
      let textIdentifier = `${allCourses[i].title}. ${allCourses[i].description}`;
      textIdentifier = textIdentifier.replace("\n", " ");
      console.log(textIdentifier);
      courseDict.values = {
        embedding: await createEmbeddings(
          process.env.OPENAI_API_KEY,
          "text-embedding-ada-002",
          textIdentifier
        ),
      };
      console.log(courseDict.values);
      courseList.vectors.push(courseDict);
    } catch (err) {
      console.log("Error in", err);
    }
  }
  console.log(courseList);
  console.log(courseList.vectors[0].values.embedding, "POOP");
  console.log(courseList.vectors[1]);
  console.log(courseList.vectors[2]);
  return JSON.stringify(courseList);
};

// program flow: get uci data
// encode them all into embeds and upsert into pinecone
// use pinecone to find closest K vectors by querying embedded vector which has metadata that is accessible --> see helpers.py
// append all matches to a course list then serve on frontend
const main = () => {
  const courseList = coursesToPineCone();
};

module.exports = {
  main,
};
