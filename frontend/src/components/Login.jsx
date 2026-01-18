import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

export default function Login() {
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={login}
      className="
        flex items-center gap-3
        px-5 py-3
        rounded-xl
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-white/10
        shadow-md
        hover:shadow-lg
        transition
        text-sm font-medium
      "
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  );
}
