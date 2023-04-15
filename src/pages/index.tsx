import Header from "@/components/Header";
import Layout from "@/components/Layout";
import LeadArea from "@/components/LeadArea";
import MainAreaWrap from "@/components/MainAreaWrap";
import TodoArea from "@/components/TodoArea";

export default function Home() {
  return (
    <div>
      <Header />

      <Layout>
        <LeadArea />
      </Layout>

      <MainAreaWrap>
        <TodoArea />
      </MainAreaWrap>
    </div>
  );
}
