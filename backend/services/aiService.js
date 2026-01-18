const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeArticle = async (content) => {
  try {
    const prompt = `
You are a news analysis AI designed to reduce misinformation.

Analyze the following news article and clearly separate FACTS from OPINIONS.

Return ONLY valid JSON in this exact format:

{
  "factSummary": "summary containing ONLY verifiable facts",
  "facts": [],
  "opinions": [],
  "claims": [],
  "credibilityScore": number between 1 and 10
}

News Article:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text.trim();
    const cleanJson = text.replace(/```json|```/g, "");

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    throw error;
  }
};

module.exports = { analyzeArticle };
