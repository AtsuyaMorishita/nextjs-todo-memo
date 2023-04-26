import Head from "next/head";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { app, auth } from "../../lib/firebase";
import { useAuthContext } from "@/context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

type HeaderType = {
  pageTitle?: string;
  currentUser: any;
  showChange: () => void;
  isTodoArea: boolean;
};

const Header = ({
  pageTitle,
  currentUser,
  showChange,
  isTodoArea,
}: HeaderType) => {
  const router = useRouter();

  const handleLogout = async () => {
    //確認用のアラート
    const isConfirm = confirm("ログアウトしますか？");
    if (!isConfirm) return;

    await signOut(auth);
    router.push("/login");
  };

  return (
    <div>
      <Head>
        <title>{pageTitle} | TODO&メモ</title>
      </Head>

      <header className="border-b-2">
        <div className="flex justify-between px-4 max-w-7xl h-16">
          <button onClick={showChange} className="text-md">
            {isTodoArea ? <PlaylistAddCheckIcon /> : <NoteAltIcon />}
          </button>
          <h1 className="flex justify-center flex-col text-md">Todo&メモ</h1>
          {currentUser && (
            <button className="text-sm" onClick={handleLogout}>
              <LogoutIcon />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
