const { PineconeClient } = require("@pinecone-database/pinecone");
const { createEmbeddings } = require("./embedCourses");

const setUpPinecone = async () => {
  const client = new PineconeClient();
  console.log("Is it because we're initializing here...???");
  await client.init({
    environment: "asia-southeast1-gcp-free",
    apiKey: "f7d4c247-3a70-4690-946b-aaaa6698ae5f",
  });
  const index = client.Index("courses");
  return index;
};

const queryDB = async (targetStr) => {
  console.log("hello");
  const index = await setUpPinecone();
  let vector = await createEmbeddings(
    process.env.OPENAI_API_KEY,
    "text-embedding-ada-002",
    targetStr
  );
  vector = vector[0].embedding; // now its an array of floats
  console.log(vector);
  const queryRequest = {
    topK: 20,
    vector: vector,
    includeMetadata: true,
    namespace: 'uci-courses'
  }
  let result = await index.query({queryRequest});
  result = result.matches; //array of the closest matches
  console.log(result);
  return result;
};

module.exports = { queryDB };
