import { Memory, TodayOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonTask from "./ButtonTask";

type LeadAreaType = {
  isTodo?: boolean;
  isMemo?: boolean;
  currentUser: any;
};

const LeadArea = ({ isTodo, isMemo, currentUser }: LeadAreaType) => {
  return (
    <div>
      <p className="text-2xl text-center">{`${
        currentUser && currentUser.email
      }でログインしています`}</p>
      <p className="text-xl text-center mt-6"></p>
      <div className="mt-8 flex items-center justify-center">
        <ButtonTask taskName="TODO" isTodoIcon isActive={isTodo} />
        <ButtonTask taskName="メモ" isActive={isMemo} />
      </div>
    </div>
  );
};

export default LeadArea;
