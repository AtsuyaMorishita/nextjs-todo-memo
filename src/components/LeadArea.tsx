import { Memory, TodayOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonTask from "./ButtonTask";

type LeadAreaType = {
  currentUser: any;
  showTodo: () => void;
  showMemo: () => void;
  isTodoArea: boolean;
  isMemoArea: boolean;
};

const LeadArea = ({
  currentUser,
  showTodo,
  showMemo,
  isTodoArea,
  isMemoArea,
}: LeadAreaType) => {
  return (
    <div>
      <p className="text-2xl text-center">{`${
        currentUser && currentUser.email
      }でログインしています`}</p>
      <p className="text-xl text-center mt-6"></p>

      <div className="mt-8 flex items-center justify-center">
        <button
          className={`border border-solid text-2xl font-bold text-center w-80 h-56 flex justify-center items-center flex-col mx-2 ${
            isTodoArea && "border-[#333]"
          }`}
          onClick={showTodo}
        >
          <span className="border-b-4 border-solid border-accent ">Todo</span>
          <TodayOutlined
            style={{ width: "80px", height: "80px", marginTop: "25px" }}
          />
        </button>

        <button
          className={`border border-solid text-2xl font-bold text-center w-80 h-56 flex justify-center items-center flex-col mx-2 ${
            isMemoArea && "border-[#333]"
          }`}
          onClick={showMemo}
        >
          <span className="border-b-4 border-solid border-accent ">メモ</span>
          <Memory
            style={{ width: "80px", height: "80px", marginTop: "25px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default LeadArea;
