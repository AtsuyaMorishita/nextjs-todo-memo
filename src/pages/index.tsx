import Header from "@/components/Header";
import Layout from "@/components/Layout";
import LeadArea from "@/components/LeadArea";
import MainAreaWrap from "@/components/MainAreaWrap";
import MemoArea from "@/components/MemoArea";
import TodoArea from "@/components/TodoArea";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

export default function Home() {
  const { currentUser } = useAuthContext();
  const [isTodoArea, setIsTodoArea] = useState(true);
  const [isMemoArea, setIsMemoArea] = useState(false);

  const showTodo = () => {
    setIsTodoArea(true);
    setIsMemoArea(false);
  };

  const showMemo = () => {
    setIsTodoArea(false);
    setIsMemoArea(true);
  };

  const showChange = () => {
    setIsTodoArea(!isTodoArea);
    setIsMemoArea(!isMemoArea);
  };

  return (
    <div>
      <Header
        currentUser={currentUser}
        showChange={showChange}
        isTodoArea={isTodoArea}
      />

      <Layout>
        <LeadArea
          currentUser={currentUser}
          showTodo={showTodo}
          showMemo={showMemo}
          isTodoArea={isTodoArea}
          isMemoArea={isMemoArea}
        />
      </Layout>

      <MainAreaWrap>
        <TodoArea currentUser={currentUser} isTodoArea={isTodoArea} />
        <MemoArea currentUser={currentUser} isMemoArea={isMemoArea} />
      </MainAreaWrap>
    </div>
  );
}
