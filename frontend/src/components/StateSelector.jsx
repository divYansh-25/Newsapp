const states = [
    "Delhi",
    "Uttar Pradesh",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "West Bengal",
];

export default function StateSelector({ state, setState }) {
    return (
        <div className="container section">
            <div className="inline-block">

                <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="
          px-3 py-2
          rounded-xl
          bg-white/80 dark:bg-white/10
          border border-white/30 dark:border-white/10
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500
          transition
        "
                >
                    <option value="">Select State</option>

                    {states.map((s) => (
                        <option key={s} value={s} className="text-black">
                            {s}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
