import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

type HeaderType = {
  currentUser: any;
  showChange: () => void;
  isTodoArea: boolean;
};

const Header = ({
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
      <header className="border-b-[1px] border-[#00488e]">
        <div className="flex justify-between px-4 max-w-7xl h-16">
          <button onClick={showChange} className="text-md focus:outline-none">
            {isTodoArea ? <PlaylistAddCheckIcon /> : <NoteAltIcon />}
          </button>
          <h1 className="flex justify-center flex-col text-lg font-bold">
            TODO MEMO
          </h1>
          {currentUser && (
            <button
              className="text-sm focus:outline-none"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
