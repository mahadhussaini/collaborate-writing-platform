const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/save-document", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    await db.collection("documents").add({ content });
    res.status(200).json({ message: "Document saved successfully" });
  } catch (error) {
    console.error("Error saving document:", error);
    res.status(500).json({ message: "Failed to save document" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
