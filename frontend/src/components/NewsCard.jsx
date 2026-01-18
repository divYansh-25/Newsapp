import { FiExternalLink } from "react-icons/fi";
import AnalysisCard from "./AnalysisCard";

export default function NewsCard({
    article,
    onAnalyze,
    analyzingId,
    analysis,
    loadingAnalysis,
}) {
    return (
        <div className="
  mb-8 rounded-2xl border border-gray-200 dark:border-white/10
  bg-white dark:bg-white/5
  shadow-sm hover:shadow-xl
  hover:-translate-y-1 transition-all duration-300
">

            {/* Image */}
            {article.image && (
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-52 object-cover"
                />
            )}

            <div className="p-6">
                <h2 className="text-xl font-semibold leading-snug mb-2">
                    {article.title}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {article.source} • {new Date(article.publishedAt).toDateString()}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-5">

                    {article.description}
                </p>

                <div className="flex flex-wrap gap-3 items-center">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-indigo-500 hover:underline"
                    >
                        Read full article <FiExternalLink />
                    </a>

                    <button
                        onClick={() => onAnalyze(article)}
                        disabled={
                            loadingAnalysis && analyzingId === article.id || !article.content
                        }
                        className="ml-auto px-4 py-2 rounded-lg bg-indigo-600 text-white
             hover:bg-indigo-700 transition disabled:opacity-40"
                    >
                        {loadingAnalysis && analyzingId === article.id
                            ? "Analyzing..."
                            : "Analyze"}
                    </button>
                </div>
            </div>

            {/* Analysis directly below THIS article */}
            {analysis && analyzingId === article.id && (
                <AnalysisCard analysis={analysis} image={article.image} />
            )}
        </div>
    );
}
