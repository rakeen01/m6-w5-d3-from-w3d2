const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "booklist";
const collectionName = process.env.MONGODB_COLLECTION || "posts";
const dbFilePath = path.join(__dirname, "db.json");

async function seedDatabase() {
  const rawFile = fs.readFileSync(dbFilePath, "utf8");
  const parsedFile = JSON.parse(rawFile);
  const posts = Array.isArray(parsedFile.posts) ? parsedFile.posts : [];
  const documents = posts.map(post => ({
    title: post.title || "",
    author: post.author || "",
    legacyId: post.id || null
  }));

  const client = new MongoClient(mongoUri);

  await client.connect();

  try {
    const collection = client.db(dbName).collection(collectionName);

    await collection.deleteMany({});

    if (documents.length) {
      await collection.insertMany(documents);
    }

    console.log(`Seeded ${documents.length} posts into ${dbName}.${collectionName}.`);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(error => {
  console.error("MongoDB seed failed.", error);
  process.exit(1);
});
