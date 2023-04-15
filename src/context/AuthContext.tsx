import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { auth } from "../../lib/firebase";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

type AuthType = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider = ({ children }: AuthType) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("ログイン状態が変化した！");
      setCurrentUser(user);
      if (!user) {
        alert("ログインしてください");
        router.push("/login");
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
