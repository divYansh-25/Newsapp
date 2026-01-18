require("dotenv").config();

const express = require("express");
const cors = require("cors");

const newsRoutes = require("./routes/news");
const analyzeRoutes = require("./routes/analyze");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/news", newsRoutes);
app.use("/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
