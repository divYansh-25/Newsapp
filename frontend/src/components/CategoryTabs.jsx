const categories = [
    "International",
    "National",
    "State",
    "Sports",
    "Awards",
    "General",
    "Local",
];

export default function CategoryTabs({ category, setCategory }) {
    return (
        <div className="container section flex flex-wrap gap-3 mb-6">


            {categories.map((c) => (
                <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === c
                            ? "bg-indigo-600 text-white shadow-md"
                            : "border border-indigo-400 text-indigo-400 hover:bg-indigo-500/10"
                        }`}
                >
                    {c}
                </button>
            ))}
        </div>
    );
}
