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
  date: string;
};

const TodoArea = ({ currentUser, isTodoArea }: TodoAreaType) => {
  const [isChecked, setsChecked] = useState(false); //チェックボックスの状態を管理
  const [inputText, setInputText] = useState(""); //タスクをテキストを管理
  const [remainingTasks, setRemainingTasks] = useState([]); //残タスクを管理
  const [completeTasks, setCompleteTasks] = useState([]); //完了タスクを管理

  //チェック時のスタイル
  const activeStyle = `after:absolute after:w-full after:h-[1px] after:left-0 after:top-[50%] after:bg-main`;
  const checkedStyle = isChecked ? activeStyle : "";

  useEffect(() => {
    getTask();
  }, []);

  /**
   * 全てのタスクを取得する
   */
  const getTask = async () => {
    //全てのtodoを取得
    const resData = await axios.post("/api/getTask", {
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
  };

  /**
   * タスクを追加する
   */
  const addTask = async () => {
    //追加するデータ
    const todoData = {
      date: "4月1日",
      isComplete: false,
      todo: inputText,
    };

    try {
      //全てのtodoを取得
      const resData = await axios.post("/api/addTask", {
        currentUserId: currentUser.uid,
        todoData,
      });

      //残タスクだけ絞り込み
      const resRemainingTasks = resData.data.filter((task: resDataType) => {
        return task.isComplete === false;
      });

      setRemainingTasks(resRemainingTasks);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 残タスクから完了タスクへの移動
   */
  const handleRemained = async (inputElement: any) => {
    try {
      //残タスクの状態を完了に変更
      const checkTaskId = await inputElement.target.id;
      await axios.put("/api/finishTask", {
        currentUserId: currentUser.uid,
        checkTaskId,
      });

      //全てのTodoを取得して画面に再描写
      getTask();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 完了タスクから残タスクへ移動
   */
  const handleCompleted = async (inputElement: any) => {
    try {
      //残タスクの状態を完了に変更
      const checkTaskId = await inputElement.target.id;
      await axios.put("/api/returnTask", {
        currentUserId: currentUser.uid,
        checkTaskId,
      });

      //全てのTodoを取得して画面に再描写
      getTask();
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

      //DBの全ての完了タスクを削除する
      const reqData = {
        currentUserId: currentUser.uid,
      };
      await axios.delete("/api/deleteCompleteTask", {
        params: reqData,
      });

      //全てのTodoを取得して画面に再描写
      setCompleteTasks([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isTodoArea && (
        <>
          <div className="text-center">
            <input
              type="text"
              className="border border-solid w-[300px] h-[50px] px-3 border-main"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="ml-2 w-[100px] h-[50px] border border-solid bg-accent border-main"
              onClick={() => addTask()}
            >
              追加
            </button>
          </div>

          {/* 残タスク */}
          <div className="border border-solid border-main p-10 mt-8">
            <p className="text-2xl font-bold inline-block border-b-4 border-solid border-accent">
              残タスク
            </p>
            <ul className="mt-6">
              {remainingTasks.map((task: any, index) => (
                <li className="my-3" key={index}>
                  <label
                    htmlFor={`${task.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      id={`${task.id}`}
                      type="checkbox"
                      className="cursor-pointer w-[20px] h-[20px]"
                      value={task.todo}
                      onChange={(e) => handleRemained(e)}
                    />
                    <p className={`ml-2 relative`}>{task.todo}</p>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* 完了タスク */}
          <div className="border border-solid border-main p-10 mt-8">
            <p className="text-2xl font-bold inline-block border-b-4 border-solid border-accent">
              完了タスク
            </p>
            <ul className="mt-6">
              {completeTasks.map((task: any, index) => (
                <li className="my-3" key={index}>
                  <label
                    htmlFor={`${task.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      id={`${task.id}`}
                      type="checkbox"
                      className="cursor-pointer w-[20px] h-[20px]"
                      checked
                      onChange={(e) => handleCompleted(e)}
                    />
                    <p className={`ml-2 relative ${activeStyle}`}>
                      {task.todo}
                    </p>
                  </label>
                </li>
              ))}
            </ul>
            <div className="text-right">
              <button
                className="border border-solid px-5 h-[50px] text-[14px] bg-main text-white border-white"
                onClick={() => handleDeleteButton()}
              >
                全て削除する
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoArea;
