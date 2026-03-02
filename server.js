const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "booklist";
const collectionName = process.env.MONGODB_COLLECTION || "posts";

let collection;

function normalizePost(document) {
  return {
    id: document._id.toString(),
    title: document.title || "",
    author: document.author || ""
  };
}

async function connectToDatabase() {
  const client = new MongoClient(mongoUri);

  await client.connect();
  const db = client.db(dbName);
  collection = db.collection(collectionName);
}

app.use(cors());
app.use(express.json());

app.get("/posts", async (_req, res) => {
  try {
    const posts = await collection.find({}).sort({ _id: 1 }).toArray();
    res.json(posts.map(normalizePost));
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch posts." });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.json(normalizePost(post));
  } catch (error) {
    return res.status(400).json({ message: "Invalid post id." });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = {
      title: req.body.title || "",
      author: req.body.author || ""
    };

    const result = await collection.insertOne(newPost);
    const savedPost = await collection.findOne({ _id: result.insertedId });

    res.status(201).json(normalizePost(savedPost));
  } catch (error) {
    res.status(500).json({ message: "Unable to create post." });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        title: req.body.title || "",
        author: req.body.author || ""
      }
    };

    const result = await collection.findOneAndUpdate(filter, update, {
      returnDocument: "after"
    });

    if (!result) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.json(normalizePost(result));
  } catch (error) {
    return res.status(400).json({ message: "Invalid post id." });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(req.params.id)
    });

    if (!result) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.json(normalizePost(result));
  } catch (error) {
    return res.status(400).json({ message: "Invalid post id." });
  }
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`MongoDB API listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection failed.", error);
    process.exit(1);
  });
