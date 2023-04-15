import Head from "next/head";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { app, auth } from "../../lib/firebase";
import { useAuthContext } from "@/context/AuthContext";

type HeaderType = {
  pageTitle?: string;
  currentUser: any;
};

const Header = ({ pageTitle, currentUser }: HeaderType) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    alert("ログアウトしました");
    router.push("/login");
  };

  return (
    <div>
      <Head>
        <title>{pageTitle} | TODO&メモ</title>
      </Head>

      <header className="border-b-2">
        <div className="flex justify-between px-8 max-w-7xl h-16">
          <h1 className="flex justify-center flex-col text-xl">TODO&メモ</h1>
          {currentUser && (
            <button className="text-sm" onClick={handleLogout}>
              ログアウト
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
