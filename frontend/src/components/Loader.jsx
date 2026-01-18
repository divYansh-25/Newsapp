export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      {/* Spinner */}
      <div className="w-10 h-10 rounded-full border-4 border-indigo-500/30 border-t-indigo-600 animate-spin" />

      {/* Text */}
      <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        {text}
      </p>
    </div>
  );
}
