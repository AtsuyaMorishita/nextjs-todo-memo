import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    getMemo();
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
    setMemoList([memoData, ...memoList]);

    try {
      //メモデータをDBに保存する
      await axios.post("/api/memo/addMemo", {
        currentUserId: currentUser.uid,
        memoData,
      });
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

    //メモをstateから削除する
    const memoArray = memoList.filter((elem) => {
      return elem.id !== elemId;
    });
    setMemoList(memoArray);

    try {
      //メモをDBから削除する
      const reqData = {
        currentUserId: currentUser.uid,
        deleteElemId: elemId,
      };

      await axios.delete("/api/memo/deleteMemo", {
        params: reqData,
      });
    } catch (error) {
      console.log(error);
    }
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

  const activeStyle = `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-h-[90vh] h-[80vh] w-[80vw] bg-[#ededed]`;

  return (
    <div className={`${isMemoArea || "hidden"}`}>
      <div className="text-center">
        <button
          className="text-lg border border-solid bg-accent border-main w-[50px] h-[50px]"
          onClick={addMemo}
        >
          ＋
        </button>
      </div>
      <ul className="md:flex flex-wrap">
        {memoList.map((memo: any, index) => (
          <li
            className={`border p-5 max-h-400px] overflow-y-scroll my-2 mx-[5px] md:w-[calc(50%-10px)] ${
              activeItem === index ? `${activeStyle} is-active` : ""
            }`}
            key={memo.id}
          >
            {activeItem === index ? (
              <button className="" onClick={changeResetMemo}>
                閉じる
              </button>
            ) : (
              <button
                className="block w-[100%] border py-2"
                onClick={() => changeActiveMemo(index)}
              >
                開く
              </button>
            )}

            <input
              type="text"
              className="text-md block w-[100%] p-2 mt-4"
              defaultValue={memo.memoTitle}
              onChange={(e) => editMemoTitle(e.target.value, memo.id)}
            />
            <textarea
              className="text-sm block w-[100%] p-2 mt-4 h-60"
              defaultValue={memo.memoContent}
              onChange={(e) => editMemoContent(e.target.value, memo.id)}
            />

            {activeItem === index ? (
              ""
            ) : (
              <div className="text-right mt-4">
                <button className="text-sm" onClick={() => deleteMemo(memo.id)}>
                  削除する
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoArea;
