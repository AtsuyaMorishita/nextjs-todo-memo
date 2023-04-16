import axios from "axios";
import { useEffect, useState } from "react";

type TodoAreaType = {
  currentUser: any;
};

const TodoArea = ({ currentUser }: TodoAreaType) => {
  // if (!userInfo) throw new Error("ユーザー情報が取得できませんでした");

  const [checked, isChecked] = useState(false); //チェッsクボックスの状態を管理
  const [inputText, setInputText] = useState(""); //タスクをテキストを管理
  const [remainingTasks, setRemainingTasks] = useState([]); //残タスクを管理
  // const [finishTasks, setFinishTasks] = useState(userInfo["completed-tasks"]); //完了タスクを管理

  //チェック時のスタイル
  const activeStyle = `after:absolute after:w-full after:h-[1px] after:left-0 after:top-[50%] after:bg-main`;
  const checkedStyle = checked ? activeStyle : "";

  useEffect(() => {
    /**
     * 全てのタスクを取得する
     */
    const getTask = async () => {
      const resData = await axios.post("/api/getTask", {
        currentUserId: currentUser.uid,
      });
      setRemainingTasks(resData.data);
    };
    getTask();
  }, []);

  /**
   * タスクを追加する
   */
  const addTask = async () => {
    //追加するデータ
    const todoData = {
      date: "4月1日",
      isComplate: false,
      todo: inputText,
    };

    try {
      const resData = await axios.post("/api/addTask", {
        currentUserId: currentUser.uid,
        todoData,
      });
      setRemainingTasks(resData.data);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  const finishTask = async (taskName: string) => {
    try {
      //DBの残タスクから完了タスクへ移動する
      // await axios.delete("/api/finishTask", {
      //   data: {
      //     username: userInfo.username,
      //     taskName: taskName,
      //   },
      // });
      //残タスクと完了タスクをフロントに表示させる
      // const newUserInfo = await axios.get(
      //   `/api/getUser?userId=${userInfo._id}`
      // );
      // setUserTasks(newUserInfo.data[0]["remaining-tasks"]);
      // setFinishTasks(newUserInfo.data[0]["completed-tasks"]);
    } catch (err) {
      console.log(err);
    }
  };

  const returnTask = async (taskName: string) => {
    try {
      //DBの残タスクから完了タスクへ移動する
      // await axios.delete("/api/returnTask", {
      //   data: {
      //     username: userInfo.username,
      //     taskName: taskName,
      //   },
      // });
      //残タスクと完了タスクをフロントに表示させる
      // const newUserInfo = await axios.get(
      //   `/api/getUser?userId=${userInfo._id}`
      // );
      // setUserTasks(newUserInfo.data[0]["remaining-tasks"]);
      // setFinishTasks(newUserInfo.data[0]["completed-tasks"]);
    } catch (err) {
      console.log(err);
    }
  };

  //残タスクのチェックボックスをクリック時の処理
  const handleRemained = async (inputElement: any) => {
    try {
      // await finishTask(inputElement.target.value);
      // inputElement.target.checked = false;
    } catch (err) {
      console.log(err);
    }
  };

  //完了タスクのチェックボックスをクリック時の処理
  const handleCompleted = async (taskName: string) => {
    try {
      // await returnTask(taskName);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteButton = async () => {
    try {
      const isConfirm = confirm(
        "完了タスクが全て削除されますが、よろしいでしょうか？"
      );
      if (!isConfirm) return;
      //DBの全ての完了タスクを削除する
      // await axios.delete("/api/allDeleteTasks");

      //完了タスクをフロントに表示させる
      // const newUserInfo = await axios.get(
      //   `/api/getUser?userId=${userInfo._id}`
      // );
      // setFinishTasks(newUserInfo.data[0]["completed-tasks"]);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(remainingTasks);

  return (
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
                htmlFor={`task_${task.id}`}
                className="flex items-center cursor-pointer"
              >
                <input
                  id={`task_${task.id}`}
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
          {/* {finishTasks.map((task, index) => (
            <li className="my-3" key={index}>
              <label
                htmlFor={`finishTask_${index}`}
                className="flex items-center cursor-pointer"
              >
                <input
                  id={`finishTask_${index}`}
                  type="checkbox"
                  className="cursor-pointer w-[20px] h-[20px]"
                  checked
                  onChange={() => handleCompleted(task)}
                />
                <p className={`ml-2 relative ${activeStyle}`}>{task}</p>
              </label>
            </li>
          ))} */}
        </ul>
        <div className="text-right">
          <button
            className="border border-solid px-5 h-[50px] text-[14px] bg-main text-white border-white"
            // onClick={() => handleDeleteButton()}
          >
            全て削除する
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoArea;
