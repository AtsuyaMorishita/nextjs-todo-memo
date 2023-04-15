import { Memory, TodayOutlined } from "@mui/icons-material";
import Link from "next/link";
import { ReactNode } from "react";
import Layout from "./Layout";

type MainAreaWrapType = {
  children: ReactNode;
};

/**
 * 下部タスクエリアのラップ
 */
const MainAreaWrap = ({ children }: MainAreaWrapType) => {
  return (
    <div className="bg-gray-100">
      <Layout>{children}</Layout>
    </div>
  );
};

export default MainAreaWrap;
