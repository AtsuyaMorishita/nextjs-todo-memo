import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { auth } from "../../lib/firebase";
import { CircularProgress } from "@mui/material";

type UserGuardType = {
  children: ReactNode;
};

const UserGuard = ({ children }: UserGuardType) => {
  const router = useRouter();

  // 未ログインであればリダイレクト
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push("/login");
    } else {
      <CircularProgress />;
    }
  });

  return <>{children}</>;
};

export default UserGuard;
