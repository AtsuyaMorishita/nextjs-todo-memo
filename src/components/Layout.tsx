import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="max-w-4xl px-6 md:px-8 mx-auto py-10">{children}</div>;
};

export default Layout;
