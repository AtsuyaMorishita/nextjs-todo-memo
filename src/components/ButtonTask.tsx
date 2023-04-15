import { Memory, TodayOutlined } from "@mui/icons-material";
import Link from "next/link";

type ButtonTaskType = {
  taskName: string;
  isTodoIcon?: boolean;
  isActive?: boolean;
  userInfo?: any;
};

/**
 * タスク選択ボタン
 */
const ButtonTask = ({
  taskName,
  isTodoIcon,
  isActive,
  userInfo,
}: ButtonTaskType) => {
  const activeBorder = `border-main`;
  const buttonBorder = isActive ? activeBorder : "";

  return (
    <Link
      href={""}
      scroll={false}
      className={`border border-solid text-2xl font-bold text-center w-80 h-56 flex justify-center items-center flex-col mx-2 ${buttonBorder}`}
    >
      <p className="border-b-4 border-solid border-accent ">{taskName}</p>
      {isTodoIcon ? (
        <TodayOutlined
          style={{ width: "80px", height: "80px", marginTop: "25px" }}
        />
      ) : (
        <Memory style={{ width: "80px", height: "80px", marginTop: "25px" }} />
      )}
    </Link>
  );
};

export default ButtonTask;
