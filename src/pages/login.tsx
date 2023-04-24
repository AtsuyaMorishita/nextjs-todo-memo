import { async } from "@firebase/util";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth, db, provider } from "../../lib/firebase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * メールアドレスのログイン
   */
  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          const docRef = doc(db, "user", user.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(doc(db, "user", user.uid), {});
          }
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          alert("ログインに失敗しました");
        });
    } catch {
      alert("何かしらのログインエラーが起きました");
    }
  };

  /**
   * Googleアカウントのログイン
   */
  // const [user, loading, error] = useAuthState(auth);
  const onGoogleLogin = async (e: any) => {
    e.preventDefault();

    await signInWithPopup(auth, provider).catch((error) =>
      alert(error.message)
    );
    router.push("/");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center px-8 md:px-0">
      <div className="text-center w-[350px] max-[100%]">
        <h1 className="text-[30px] font-bold mb-6">ログイン</h1>
        {/* Googleアカウントでログイン */}
        <div>
          <button
            onClick={onGoogleLogin}
            className="border-[3px] border-[#333] w-[100%] rounded-md h-[50px]"
          >
            Googleアカウントでログイン
          </button>
        </div>
        <p className="py-3 text-lg">or</p>
        {/* メールアドレスでログイン */}
        <form onSubmit={onLogin}>
          <div>
            <input
              type="email"
              required
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-[3px] border-[#333] w-[100%] rounded-md px-3 h-[50px]"
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              required
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-[3px] border-[#333] w-[100%] rounded-md px-3 h-[50px]"
            />
          </div>
          <button
            type="submit"
            className="border-[3px] border-[#333] w-[100%] rounded-md mt-8 h-[50px]"
          >
            ログイン
          </button>
          <div className="mt-3">
            <Link href="/signup" className="text-sm">
              ユーザー登録がお済みでない方はこちらから
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
