const express = require("express");
const { analyzeArticle } = require("../services/aiService");
const { db } = require("../firebase/firebaseAdmin");

const router = express.Router();

router.post("/", async (req, res) => {
    const { articleId, content } = req.body;

    try {
        const docRef = db.collection("article_analysis").doc(articleId);
        const docSnap = await docRef.get();

        // 🔁 Return cached analysis
        if (docSnap.exists) {
            return res.json(docSnap.data());
        }

        // 🧠 AI analysis
        const analysis = await analyzeArticle(content);

        // 💾 Save to Firestore
        await docRef.set({
            ...analysis,
            createdAt: new Date(),
        });

        res.json(analysis);
    } catch (err) {
        console.error("🔥 ANALYZE ERROR 🔥");
        console.error(err);
        res.status(500).json({ error: "AI analysis failed" });
    }

});

module.exports = router;
