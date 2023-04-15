import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * ユーザーログイン
   */
  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password);
      alert("ログインできました！");
      await router.push("/");
    } catch {
      alert("ログインに失敗しました");
    }
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">ログイン</button>
        <div>
          <Link href="/signup">ユーザー登録がお済みでない方はこちらから</Link>
          {/* <Link href="/sendemail">パスワードをお忘れの方はこちらから</Link> */}
        </div>
      </form>
    </div>
  );
}
