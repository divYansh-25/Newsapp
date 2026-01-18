const BASE_URL = "http://localhost:5000";

/**
 * Fetch news by date + category + state + language
 */
export const getNewsByDate = async (
  date,
  category = "International",
  state = "",
  language = "en"
) => {
  const params = new URLSearchParams({
    date,
    category,
    state,
    language,
  });

  const res = await fetch(`${BASE_URL}/news?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
};

/**
 * Analyze article
 */
export const analyzeArticle = async (article) => {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      articleId: article.id,
      content: article.content,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze article");
  }

  return res.json();
};
