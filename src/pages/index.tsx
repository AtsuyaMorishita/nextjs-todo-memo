import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { app } from "../../lib/firebase";

export default function Home() {
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogout = async () => {
    await signOut(auth);
    alert("ログアウトしました");
    await router.push("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}
