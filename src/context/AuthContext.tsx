import { onAuthStateChanged, User } from "firebase/auth";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("ログイン状態が変化した！", user);
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p className="text-center">ローディング中...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
