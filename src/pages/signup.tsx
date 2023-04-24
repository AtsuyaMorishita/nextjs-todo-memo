import { app } from "../../lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  /**
   * ユーザー会員登録
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          alert("会員登録ができました！");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      alert("会員登録に失敗しました。。");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center px-8 md:px-0">
      <div className="text-center w-[350px] max-[100%]">
        <h1 className="text-[30px] font-bold mb-6">会員登録</h1>

        <form onSubmit={onSubmit}>
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
          <div>
            <button
              type="submit"
              className="border-[3px] border-[#333] w-[100%] rounded-md mt-8 h-[50px]"
            >
              サインアップ
            </button>
          </div>
          <div className="mt-3">
            <Link href={"/login"} className="text-sm">
              登録済みの方はこちら
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
