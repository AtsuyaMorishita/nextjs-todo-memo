import Header from "@/components/Header";
import Layout from "@/components/Layout";
import LeadArea from "@/components/LeadArea";
import MainAreaWrap from "@/components/MainAreaWrap";
import TodoArea from "@/components/TodoArea";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const { currentUser } = useAuthContext();

  return (
    <div>
      <Header currentUser={currentUser} />

      <Layout>
        <LeadArea currentUser={currentUser} />
      </Layout>

      <MainAreaWrap>
        <TodoArea />
      </MainAreaWrap>
    </div>
  );
}
