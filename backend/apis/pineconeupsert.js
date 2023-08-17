const { PineconeClient } = require("@pinecone-database/pinecone");
const fs = require("fs");
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

const upsert = async (vectors, index) => {
  try {
    const result = await index.upsert({
      upsertRequest: {
        vectors: vectors,
        namespace: "uci-courses",
      },
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const pineconeUpsert = async (jsonListData) => {
  const ListData = jsonListData.vectors;
  let vectors = [];
  let mainvector = { vectors: [], namespace: "" };
  for (let i = 0; i < ListData.length; ++i) {
    let id = ListData[i].id;
    let values = ListData[i].values[0].embedding;
    console.log(values, "PINECONEUPSERT\n\n");
    let metadata = ListData[i].metadata;
    let vector = { id: id, values: values, metadata: metadata };
    vectors.push(vector);
    if (i % 99 == 0 && i != 0) {
      const index = await setUpPinecone();
      await upsert(vectors, index);
      mainvector.vectors.concat(vectors);
      vectors = [];
    }
  }
  fs.writeFileSync("vectordata.json", JSON.stringify(mainvector));

  return;
};

module.exports = { pineconeUpsert };
