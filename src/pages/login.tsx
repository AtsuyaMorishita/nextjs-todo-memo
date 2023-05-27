import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db, provider } from "../../lib/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import { Meta } from "@/components/Meta";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@mui/material";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginAlert, setIsLoginAlert] = useState(false);
  const [isAllLoad, setIsAllLoad] = useState(false); //上部読み込みバーの状態

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && router.push("/");
    });
  }, []);

  /**
   * ゲスト用ののログイン
   */
  const onGuestLogin = async (e: any) => {
    setIsAllLoad(true);
    try {
      signInWithEmailAndPassword(
        auth,
        process.env.NEXT_PUBLIC_GUEST_EMAIL!,
        process.env.NEXT_PUBLIC_GUEST_PASSWORD!
      )
        .then(async (userCredential) => {
          const user = userCredential.user;

          const docRef = doc(db, "user", user.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(doc(db, "user", user.uid), {});
          }
          setIsAllLoad(false);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          alert("ログインに失敗しました");
        });
    } catch {
      alert("ログインエラーが起きました");
    }
  };

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
      alert("ログインエラーが起きました");
    }
  };

  /**
   * Googleアカウントのログイン
   */
  const onGoogleLogin = async (e: any) => {
    e.preventDefault();
    await signInWithRedirect(auth, provider);
    router.push("/");
  };

  const test = () => {
    console.log("lllllllllll");
  };

  return (
    <>
      <Meta title="ログイン" />

      {isAllLoad && (
        <div className="fixed top-0 left-0 w-[100%]">
          <LinearProgress className="h-[7px] b-radius" />
        </div>
      )}

      {/* ゲスト用ログイン時のモーダル */}
      <Dialog
        open={isLoginAlert}
        onClose={() => setIsLoginAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"⚠︎注意事項"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ゲスト用のログインは他の方も利用するので、書き込み内容など注意して適切にご利用下さい。
            <br />
            TODOリストとメモの内容はそれぞれDBに保存されますので、お試し後の最後に削除いただけると幸いです。
            <br />
            利用者は特定されないので、安心してご利用下さい。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLoginAlert(false)}>キャンセル</Button>
          <Button onClick={onGuestLogin} autoFocus>
            確認しました
          </Button>
        </DialogActions>
      </Dialog>

      <div className="w-[100vw] h-[100vh] flex items-center justify-center px-8 md:px-0">
        <div className="text-center w-[350px] max-[100%] relative">
          <h1 className="text-[30px] font-bold mb-6">ログイン</h1>

          {/* Googleアカウントでログイン */}
          <div>
            <button
              onClick={onGoogleLogin}
              className="border-[3px] border-[#333] w-[100%] rounded-md h-[50px]"
            >
              <GoogleIcon />
              <span className="inline-block ml-1">Googleで続行</span>
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
              className="w-[100%] rounded-md mt-8 h-[50px] bg-[#00488e] text-white font-bold"
            >
              ログイン
            </button>
            <div className="mt-3">
              <Link href="/signup" className="text-sm">
                ユーザー登録がお済みでない方はこちらから
              </Link>
            </div>
          </form>
          <div className="mt-3">
            <button
              onClick={() => setIsLoginAlert(true)}
              className="text-sm border-b-2 border-[#333] outline-none"
            >
              ゲスト用のログインはこちら
              <br />
            </button>
            <p className="text-sm text-left mt-2">
              ※採用担当者様やちょっと覗いてみたい方はこちらからログイン下さい。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
