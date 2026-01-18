import { FaGoogle } from "react-icons/fa";

export default function AnalysisCard({ analysis, image }) {
    const score = analysis.credibilityScore || 0;

    return (
        <div className="mt-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 animate-fadeIn">


            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Analysis Result</h3>

                <span className="flex items-center gap-2 text-xs text-gray-400">
                    <FaGoogle /> Powered by Gemini
                </span>
            </div>

            {/* Credibility Progress */}
            <div className="mb-4">
                <p className="text-sm mb-1">
                    Credibility Score: <strong>{score}/10</strong>
                </p>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 transition-all duration-500"
                        style={{ width: `${score * 10}%` }}
                    />
                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="font-medium mb-1">Fact Summary</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {analysis.factSummary}</p>
                </div>

                <div>
                    <h4 className="font-medium mb-1">Facts</h4>
                    <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">

                        {analysis.facts?.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-1">Opinions</h4>
                    <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">

                        {analysis.opinions?.map((o, i) => (
                            <li key={i}>{o}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-1">Claims</h4>
                    <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">

                        {analysis.claims?.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
