import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function AuthButton({ user, setUser }) {
  const login = async () => {
    const res = await signInWithPopup(auth, provider);
    setUser(res.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return user ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={login}>Continue with Google</button>
  );
}
