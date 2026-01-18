import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

import { getNewsByDate, analyzeArticle } from "./services/api";

import Header from "./components/Header";
import CategoryTabs from "./components/CategoryTabs";
import StateSelector from "./components/StateSelector";
import NewsCard from "./components/NewsCard";
import Loader from "./components/Loader";

function App() {
  const [user, setUser] = useState(null);

  const [language, setLanguage] = useState("en");
  const [selectedDate, setSelectedDate] = useState("2026-01-10");
  const [category, setCategory] = useState("International");
  const [stateName, setStateName] = useState("");

  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);

  const [analysis, setAnalysis] = useState(null);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const [darkMode, setDarkMode] = useState(true);

  // 🔐 Auth listener
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  // 📰 Fetch news
  useEffect(() => {
    const loadNews = async () => {
      setLoadingNews(true);
      setNews([]);
      setAnalysis(null);
      setAnalyzingId(null);

      try {
        const data = await getNewsByDate(
          selectedDate,
          category,
          stateName,
          language
        );
        setNews(data);
      } catch (err) {
        console.error(err.message);
      }

      setLoadingNews(false);
    };

    loadNews();
  }, [selectedDate, category, stateName, language]);

  // 🧠 Analyze article
  const handleAnalyze = async (article) => {
    setAnalyzingId(article.id);
    setLoadingAnalysis(true);
    setAnalysis(null);

    try {
      const result = await analyzeArticle(article);
      setAnalysis(result);
    } catch (err) {
      console.error(err.message);
    }

    setLoadingAnalysis(false);
  };

  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${darkMode
        ? "bg-gradient-to-br from-black via-gray-900 to-black text-white p-3"
        : "bg-gradient-to-br from-indigo-100 via-purple-50 to-sky-100 text-gray-900 p-3"
        }`}
    >
      {/* IMPORTANT: content wrapper */}
      <div className="pt-10">
        <Header
          user={user}
          onLogin={login}
          onLogout={logout}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          language={language}
          setLanguage={setLanguage}
        />

        <CategoryTabs category={category} setCategory={setCategory} />

        {category === "State" && (
          <div className="container section">
            <StateSelector state={stateName} setState={setStateName} />
          </div>
        )}

        {loadingNews && <Loader text="Fetching news..." />}

        {/* Empty state */}
        {!loadingNews && news.length === 0 && (
          <div className="container text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg font-medium">No news available</p>
            <p className="text-sm mt-1">
              Try changing date, category, or language.
              (Not Available for Today's Date will update Tomorrow)
            </p>
          </div>
        )}

        <div className="container">
          {!loadingNews &&
            news.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onAnalyze={handleAnalyze}
                analyzingId={analyzingId}
                analysis={analysis}
                loadingAnalysis={loadingAnalysis}
              />
            ))}
        </div>

      </div>
    </div>
  );
}

export default App;
