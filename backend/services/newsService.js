const axios = require("axios");

/**
 * Fetch news by date, query, and language
 */
const fetchNewsByDate = async (
  date,
  query = "world",
  language = "en"
) => {
  // 🔒 Prevent future date crash
  const today = new Date().toISOString().split("T")[0];
  const safeDate = date > today ? today : date;

  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: query,
          from: safeDate,
          to: safeDate,
          sortBy: "publishedAt",
          language, // ✅ now defined
          pageSize: 20,
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    return response.data.articles.map((a, idx) => ({
      id: `${safeDate}-${query}-${language}-${idx}`, // ✅ fixed
      title: a.title,
      description: a.description,
      content: a.content || a.description || "",
      source: a.source?.name || "Unknown",
      url: a.url,
      image: a.urlToImage,
      publishedAt: a.publishedAt,
    }));
  } catch (err) {
    console.error(
      "NEWS API ERROR:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = { fetchNewsByDate };
