import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@mui/material";

type TodoAreaType = {
  currentUser: any;
  isMemoArea: boolean;
};

type memoDataType = {
  id: string;
  memoTitle: string;
  memoContent: string;
  timestamp: string;
};

const MemoArea = ({ isMemoArea, currentUser }: TodoAreaType) => {
  const [memoList, setMemoList] = useState<memoDataType[]>([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoad, setIsLoad] = useState(true); //タスクの読み込み状態を管理

  useEffect(() => {
    getMemo();
    setIsLoad(false);
  }, []);

  /**
   * 全てのメモアイテムを取得する
   */
  const getMemo = async () => {
    const resData: any = await axios.post("/api/memo/getMemo", {
      currentUserId: currentUser.uid,
    });
    setMemoList(resData.data);
  };

  /**
   * 新しいメモを追加する
   */
  const addMemo = async () => {
    //メモのstateを更新する
    const getKey = () => Math.random().toString(32).substring(2);
    const dateStr = new Date().toLocaleString();
    const memoData = {
      id: getKey(),
      memoTitle: "",
      memoContent: "",
      timestamp: dateStr,
    };

    try {
      //メモデータをDBに保存する
      await axios.post("/api/memo/addMemo", {
        currentUserId: currentUser.uid,
        memoData,
      });

      setMemoList([memoData, ...memoList]);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 特定のメモを削除する
   */
  const deleteMemo = async (elemId: string) => {
    //確認用のアラート
    const isConfirm = confirm("メモが削除されますが、よろしいでしょうか？");
    if (!isConfirm) return;

    try {
      //メモをDBから削除する
      const reqData = {
        currentUserId: currentUser.uid,
        deleteElemId: elemId,
      };

      await axios.delete("/api/memo/deleteMemo", {
        params: reqData,
      });

      //メモをstateから削除する
      const memoArray = memoList.filter((elem) => {
        return elem.id !== elemId;
      });
      setMemoList(memoArray);
    } catch (error) {
      console.log(error);
    }

    setActiveItem(null);
  };

  /**
   * タイトルを編集する
   */
  const editMemoTitle = async (text: string, memoId: string) => {
    try {
      await axios.put("/api/memo/editMemoTitle", {
        currentUserId: currentUser.uid,
        memoId,
        text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * コンテンツを編集する
   */
  const editMemoContent = async (text: string, memoId: string) => {
    try {
      await axios.put("/api/memo/editMemoContent", {
        currentUserId: currentUser.uid,
        memoId,
        text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * クリックしたメモをアクティブ状態にする
   */
  const changeActiveMemo = (index: any) => {
    setActiveItem(index);
  };

  const changeResetMemo = () => {
    setActiveItem(null);
  };

  const liActiveStyle = `fixed left-0 max-h-[100vh] min-h-[100vh] h-[100vh] w-[100vw] bg-white my-0 mx-0 top-[48px] border-0 rounded-none mt-0 mb-0 ml-0 mr-0 md:w-[100%]`;
  const liNormalStyle = `cursor-pointer border border-[#00488e] rounded-md max-h-[150px] overflow-y-scroll my-4 mx-[5px] md:w-[calc(50%-10px)]`;
  const divActiveStyle = `h-[95%]`;
  const inputActiveStyle = `text-xl font-semibold cursor-auto`;
  const textAreaActiveStyle = `min-h-[70%] text-base cursor-auto`;

  return (
    <div
      className={`${
        isMemoArea || "hidden"
      } bg-white px-4 md:px-20 py-10 md:py-20 rounded-2xl`}
    >
      <p className="text-xl md:text-2xl font-bold inline-block border-b-4 border-solid border-[#00488e] mb-6">
        MEMO
      </p>

      <div className="text-center">
        <button className="text-2xl font-bold" onClick={addMemo}>
          ＋
        </button>
      </div>
      {!isLoad ? (
        <ul className="md:flex flex-wrap">
          {memoList.map((memo: any, index) => (
            <li
              className={`${
                activeItem === index
                  ? `${liActiveStyle} is-active`
                  : liNormalStyle
              }`}
              key={memo.id}
            >
              {activeItem === index ? (
                <div className="flex justify-between px-4 pt-4 w-[100%] fixed top-0 bg-white">
                  <button
                    className="text-2xl font-bold"
                    onClick={changeResetMemo}
                  >
                    ←
                  </button>
                  <button
                    className="text-sm"
                    onClick={() => deleteMemo(memo.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ) : (
                ""
              )}
              <div
                className={`p-2 ${
                  activeItem === index ? `${divActiveStyle}` : ""
                }`}
                onClick={() => changeActiveMemo(index)}
              >
                <input
                  type="text"
                  className={`cursor-pointer text-md block w-[100%] p-2 focus:outline-none ${
                    activeItem === index ? `${inputActiveStyle}` : ""
                  }`}
                  defaultValue={memo.memoTitle}
                  onChange={(e) => editMemoTitle(e.target.value, memo.id)}
                  placeholder="タイトル"
                />
                <textarea
                  className={`cursor-pointer text-sm block w-[100%] p-2 focus:outline-none ${
                    activeItem === index ? `${textAreaActiveStyle}` : ""
                  }`}
                  defaultValue={memo.memoContent}
                  onChange={(e) => editMemoContent(e.target.value, memo.id)}
                  placeholder="メモ"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-5">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default MemoArea;
