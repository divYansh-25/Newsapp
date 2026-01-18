const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "bn", label: "Bengali" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "mr", label: "Marathi" },
  { code: "gu", label: "Gujarati" },
];

export default function LanguageSelector({ language, setLanguage }) {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
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
      {languages.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
          className="text-black"
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
}
