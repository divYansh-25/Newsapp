import { FiSun, FiMoon, FiLogIn, FiLogOut } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";

export default function Header({
    user,
    onLogin,
    onLogout,
    selectedDate,
    setSelectedDate,
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
}) {
    return (
        <header className="container flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between mb-10 p-6 rounded-2xl
  bg-white/70 dark:bg-gray-900/70
  backdrop-blur-xl
  border border-white/30 dark:border-white/10
  shadow-xl">



            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-600 text-white">
                    <FaRegNewspaper size={20} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        NewsApp
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">

                        AI-powered misinformation awareness
                    </p>

                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 justify-start lg:justify-end">

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <LanguageSelector language={language} setLanguage={setLanguage} />

                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                    {darkMode ? <FiSun /> : <FiMoon />}
                </button>

                {user ? (
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                    >
                        <FiLogOut /> Logout
                    </button>
                ) : (
                    <button
                        onClick={onLogin}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                        <FiLogIn /> Login
                    </button>
                )}
            </div>
        </header>
    );
}
