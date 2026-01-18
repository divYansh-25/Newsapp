const express = require("express");
const { fetchNewsByDate } = require("../services/newsService");
const { db } = require("../firebase/firebaseAdmin");

const router = express.Router();

/**
 * GET /news?date=YYYY-MM-DD&category=International&state=Delhi&language=en
 */
router.get("/", async (req, res) => {
  const {
    date,
    category = "International",
    state = "",
    language = "en",
  } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }

  try {
    // 🔑 cache must include language
    const cacheKey = `${date}_${category}_${state || "all"}_${language}`;
    const docRef = db.collection("news_by_date").doc(cacheKey);
    const docSnap = await docRef.get();

    // 🔁 Firestore cache hit
    if (docSnap.exists) {
      return res.json(docSnap.data().articles);
    }

    // 🧠 category → query mapping
    let query = "world";
    if (category === "International") query = "world";
    if (category === "National") query = "india";
    if (category === "Sports") query = "sports";
    if (category === "Awards") query = "awards";
    if (category === "General") query = "current affairs";
    if ((category === "State" || category === "Local") && state) {
      query = state;
    }

    const articles = await fetchNewsByDate(date, query, language);

    await docRef.set({
      articles,
      createdAt: new Date(),
    });

    res.json(articles);
  } catch (err) {
    console.error("NEWS ROUTE ERROR:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
