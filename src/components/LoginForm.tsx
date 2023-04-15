import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  //ユーザーログイン
  const onLogin = async (e: any) => {
    e.preventDefault();
    try {

      await router.push("/");
    } catch {
      alert("エラーが発生しました");
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
        <div>
          <label>パスワード（確認）</label>
          <input
            type="password"
            required
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </div>
        <button type="submit">ログイン</button>
        <div>
          <Link href="/signup">ユーザー登録がお済みでない方はこちらから</Link>
          <Link href="/sendemail">パスワードをお忘れの方はこちらから</Link>
        </div>
      </form>
    </div>
  );
}
