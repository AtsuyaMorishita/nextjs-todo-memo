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
    <div className="">
      <Layout>{children}</Layout>
    </div>
  );
};

export default MainAreaWrap;
