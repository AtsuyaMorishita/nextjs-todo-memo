import axios from "axios";
import { useEffect, useState } from "react";

type TodoAreaType = {
  currentUser: any;
  isTodoArea: boolean;
};

type resDataType = {
  id: string;
  todo: string;
  isComplete: boolean;
  timestamp: string;
  isChecked: boolean;
};

const TodoArea = ({ currentUser, isTodoArea }: TodoAreaType) => {
  const [isChecked, setsChecked] = useState(false); //チェックボックスの状態を管理
  const [inputText, setInputText] = useState(""); //タスクをテキストを管理
  const [remainingTasks, setRemainingTasks] = useState<resDataType[]>([]); //残タスクを管理
  const [completeTasks, setCompleteTasks] = useState<resDataType[]>([]); //完了タスクを管理
  const [isLoad, setIsLoad] = useState(true); //タスクの読み込み状態を管理

  //チェック時のスタイル
  const activeStyle = `after:absolute after:w-full after:h-[1px] after:left-0 after:top-[50%] after:bg-main`;
  const checkedStyle = isChecked ? activeStyle : "";

  useEffect(() => {
    getTask();
    return () => setIsLoad(true);
  }, []);

  /**
   * 全てのタスクを取得する
   */
  const getTask = async () => {
    //全てのtodoを取得
    const resData = await axios.post("/api/todo/getTask", {
      currentUserId: currentUser.uid,
    });

    //残タスクだけ絞り込み
    const resRemainingTasks = resData.data.filter((task: resDataType) => {
      return task.isComplete === false;
    });
    setRemainingTasks(resRemainingTasks);

    //完了タスクだけ絞り込み
    const resCompleteTasks = resData.data.filter((task: resDataType) => {
      return task.isComplete === true;
    });
    setCompleteTasks(resCompleteTasks);

    setIsLoad(false);
  };

  /**
   * タスクを追加する
   */
  const addTask = async () => {
    if (inputText.length === 0) {
      alert("タスクを入力してください。");
      return;
    }

    setInputText("");

    //todoをstateに追加する
    const getKey = () => Math.random().toString(32).substring(2);
    const dateStr = new Date().toLocaleString();
    const todoData = {
      id: getKey(),
      todo: inputText,
      isComplete: false,
      timestamp: dateStr,
      isChecked: false,
    };
    setRemainingTasks([todoData, ...remainingTasks]);

    try {
      //todoをDBに追加する
      await axios.post("/api/todo/addTask", {
        currentUserId: currentUser.uid,
        todoData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 残タスクから完了タスクへの移動
   */
  const handleRemained = async (inputElement: any) => {
    try {
      const checkTaskId = await inputElement.target.id;

      //残タスクのstateを更新
      const remainObj = remainingTasks.filter((elem: any) => {
        return elem.id !== checkTaskId;
      });
      setRemainingTasks(remainObj);

      //完了タスクのstateを更新
      const finishObj = remainingTasks.filter((elem: any) => {
        return elem.id === checkTaskId;
      });
      finishObj[0].isChecked = true;
      setCompleteTasks([finishObj[0], ...completeTasks]);

      //タスクの状態をDBに保存
      await axios.put("/api/todo/finishTask", {
        currentUserId: currentUser.uid,
        checkTaskId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 完了タスクから残タスクへ移動
   */
  const handleCompleted = async (inputElement: any) => {
    try {
      const checkTaskId = await inputElement.target.id;

      //完了タスクのstateを更新
      const changeFinishObj = completeTasks.filter((elem: any) => {
        return elem.id !== checkTaskId;
      });
      setCompleteTasks(changeFinishObj);

      //残タスクのstateを更新
      const changeRemainObj = completeTasks.filter((elem: any) => {
        return elem.id === checkTaskId;
      });
      changeRemainObj[0].isChecked = false;
      setRemainingTasks([changeRemainObj[0], ...remainingTasks]);

      //タスクの状態をDBに保存
      await axios.put("/api/todo/returnTask", {
        currentUserId: currentUser.uid,
        checkTaskId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 完了タスクを全て削除する
   */
  const handleDeleteButton = async () => {
    try {
      //確認用のアラート
      const isConfirm = confirm(
        "完了タスクが全て削除されますが、よろしいでしょうか？"
      );
      if (!isConfirm) return;

      //完了タスクのstateを空にする
      setCompleteTasks([]);

      //DBの全ての完了タスクを削除する
      const reqData = {
        currentUserId: currentUser.uid,
      };
      await axios.delete("/api/todo/deleteCompleteTask", {
        params: reqData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${isTodoArea || "hidden"} max-w-lg mx-auto`}>
      {/* 残タスク */}
      <div className="">
        <p className="text-2xl font-bold inline-block border-b-4 border-solid border-accent mb-6">
          Todo
        </p>

        <div className="text-center flex items-center">
          <button className="text-2xl font-bold" onClick={() => addTask()}>
            ＋
          </button>
          <input
            type="text"
            className="border-main bg-transparent focus:outline-none ml-4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="タスクを入力"
          />
        </div>

        {!isLoad ? (
          <ul className="mt-4">
            {remainingTasks.map((task: any, index) => (
              <li className="my-4" key={index}>
                <label
                  htmlFor={`${task.id}`}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    id={`${task.id}`}
                    type="checkbox"
                    className="cursor-pointer w-[25px] h-[25px]"
                    value={task.todo}
                    checked={task.isChecked}
                    onChange={(e) => handleRemained(e)}
                  />
                  <p className="ml-4 relative">{task.todo}</p>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>読み込み中・・・</p>
        )}
      </div>

      {/* 完了タスク */}
      <div className="mt-10">
        <p className="text-md font-bold block text-center">
          チェック済みタスク
        </p>
        {!isLoad ? (
          <ul className="mt-6">
            {completeTasks.map((task: any, index) => (
              <li className="my-3" key={index}>
                <label
                  htmlFor={`${task.id}`}
                  className="flex items-center cursor-pointer opacity-50"
                >
                  <input
                    id={`${task.id}`}
                    type="checkbox"
                    className="cursor-pointer w-[25px] h-[25px]"
                    checked={task.isChecked}
                    onChange={(e) => handleCompleted(e)}
                  />
                  <p className={`ml-4 relative ${activeStyle}`}>{task.todo}</p>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>読み込み中・・・</p>
        )}

        {completeTasks.length ? (
          <div className="text-right">
            <button
              className="border border-solid p-3 text-xs bg-main text-white border-white"
              onClick={() => handleDeleteButton()}
            >
              チェック済みを削除
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TodoArea;
