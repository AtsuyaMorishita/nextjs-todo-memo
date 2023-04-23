import axios from "axios";
import { useEffect, useState } from "react";

type TodoAreaType = {
  currentUser: any;
  isMemoArea: boolean;
};

const MemoArea = ({ isMemoArea, currentUser }: TodoAreaType) => {
  const [memoList, setMemoList] = useState([]);
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
    //追加するデータ
    const dateStr = new Date().toLocaleString();
    const memoData = {
      memoTitle: "",
      memoContent: "",
      timestamp: dateStr,
    };

    try {
      const resData = await axios.post("/api/memo/addMemo", {
        currentUserId: currentUser.uid,
        memoData,
      });
      setMemoList(resData.data);
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
      const reqData = {
        currentUserId: currentUser.uid,
        deleteElemId: elemId,
      };
      await axios.delete("/api/memo/deleteMemo", {
        params: reqData,
      });

      getMemo();
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
    <>
      {isMemoArea && (
        <div>
          <button onClick={addMemo}>＋</button>
          <ul className="">
            {memoList.map((memo: any, index) => (
              <li
                className={`border p-5 max-h-[300px] overflow-y-scroll my-5 ${
                  activeItem === index ? `${activeStyle} is-active` : ""
                }`}
                key={memo.id}
              >
                {activeItem === index ? (
                  <button onClick={changeResetMemo}>閉じる</button>
                ) : (
                  <button onClick={() => changeActiveMemo(index)}>開く</button>
                )}

                <button onClick={() => deleteMemo(memo.id)}>削除する</button>
                <input
                  type="text"
                  className="text-md"
                  defaultValue={memo.memoTitle}
                  onChange={(e) => editMemoTitle(e.target.value, memo.id)}
                />
                <textarea
                  className="text-sm"
                  defaultValue={memo.memoContent}
                  onChange={(e) => editMemoContent(e.target.value, memo.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MemoArea;
