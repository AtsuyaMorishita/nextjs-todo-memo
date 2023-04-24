import { useAuthContext } from "@/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { auth } from "../../lib/firebase";

type UserGuardType = {
  children: ReactNode;
};

const UserGuard = ({ children }: UserGuardType) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  // 未ログインであればリダイレクト
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push("/login");
    } else {
      <p>ローディング中</p>;
    }
  });

  return <>{children}</>;
};

export default UserGuard;
