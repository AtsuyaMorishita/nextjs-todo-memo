import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CircularProgress, LinearProgress, dialogClasses } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TaskMoveItem from "./TaskMoveItem";

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
  const [isLoad, setIsLoad] = useState(false); //タスクの読み込み状態を管理
  const [isFinishLoad, setIsFinishLoad] = useState(false); //タスクの読み込み状態を管理
  const [isAllLoad, setIsAllLoad] = useState(false); //上部読み込みバーの状態
  const [activeId, setActiveId] = useState<UniqueIdentifier>(); //DragOverlay用のid
  const [dragItemName, setDragItemName] = useState("");

  // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    getTask();
    console.log(
      remainingTasks.every((task) => "id" in task && task.id !== undefined)
    );
  }, []);

  /**
   * 全てのタスクを取得する
   */
  const getTask = async () => {
    setIsLoad(true);
    setIsFinishLoad(true);

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
    setIsFinishLoad(false);
  };

  /**
   * タスクを追加する
   */
  const addTask = async () => {
    if (inputText.length === 0) {
      alert("タスクを入力してください。");
      return;
    }
    setIsAllLoad(true);

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

    try {
      //todoをDBに追加する
      await axios.post("/api/todo/addTask", {
        currentUserId: currentUser.uid,
        todoData,
      });

      setInputText("");
      setRemainingTasks([todoData, ...remainingTasks]);
      setIsAllLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 残タスクから完了タスクへの移動
   */
  const handleRemained = async (inputElement: any) => {
    try {
      setIsAllLoad(true);

      const checkTaskId = await inputElement.target.id;

      //タスクの状態をDBに保存
      await axios.put("/api/todo/finishTask", {
        currentUserId: currentUser.uid,
        checkTaskId,
      });

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

      setIsAllLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 完了タスクから残タスクへ移動
   */
  const handleCompleted = async (inputElement: any) => {
    try {
      setIsAllLoad(true);

      const checkTaskId = await inputElement.target.id;

      //タスクの状態をDBに保存
      await axios.put("/api/todo/returnTask", {
        currentUserId: currentUser.uid,
        checkTaskId,
      });

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

      setIsAllLoad(false);
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

      setIsAllLoad(true);
      setIsFinishLoad(true);

      //DBの全ての完了タスクを削除する
      const reqData = {
        currentUserId: currentUser.uid,
      };
      await axios.delete("/api/todo/deleteCompleteTask", {
        params: reqData,
      });

      setCompleteTasks([]);
      setIsAllLoad(false);
      setIsFinishLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * ドラッグ開始時に発火する関数
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  /**
   * ドラッグ移動中に発火する関数
   */
  function arrayMove(array: any, from: number, to: number) {
    const copy = [...array];
    const valueToMove = copy[from];
    copy.splice(from, 1);
    copy.splice(to, 0, valueToMove);
    return copy;
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;
    const activeIndex = remainingTasks.findIndex(
      (task) => task.id === active.id
    );
    setDragItemName(remainingTasks[activeIndex].todo);
    const overIndex = remainingTasks.findIndex((task) => task.id === over.id);
    if (activeIndex === overIndex) return;
    // ドラッグしたアイテムを新しい位置に移動
    const newArray = arrayMove(remainingTasks, activeIndex, overIndex);
    // 新しい順序をstateに設定
    setRemainingTasks(newArray);
  };

  /**
   * ドラッグ終了時に発火する関数
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeIndex = remainingTasks.findIndex(
      (task) => task.id === active.id
    );
    const overIndex = remainingTasks.findIndex((task) => task.id === over.id);
    if (activeIndex === overIndex) return;
    // ドラッグしたアイテムを新しい位置に移動
    const newArray = arrayMove(remainingTasks, activeIndex, overIndex);
    // 新しい順序をstateに設定
    setRemainingTasks(newArray);

    //fireStoreに新しい配列を登録する
  };

  return (
    <>
      {isAllLoad && (
        <div className="fixed top-0 left-0 w-[100%]">
          <LinearProgress className="h-[7px] b-radius" />
        </div>
      )}

      <div
        className={`${
          isTodoArea || "hidden"
        } mx-auto bg-white px-4 py-10 md:py-20 rounded-2xl`}
      >
        {/* 残タスク */}
        <div className="max-w-lg mx-auto">
          <p className="text-xl md:text-2xl font-bold inline-block border-b-4 border-solid border-[#00488e] mb-6">
            TODO
          </p>
          <div className="text-center flex items-center">
            <button
              className="text-2xl font-bold outline-none"
              onClick={() => addTask()}
            >
              ＋
            </button>
            <input
              type="text"
              className="border-main bg-transparent focus:outline-none ml-4 w-[90%]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="タスクを入力"
            />
          </div>
          {!isLoad ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={remainingTasks}
                strategy={rectSortingStrategy}
              >
                <ul className="mt-4">
                  {remainingTasks.map((task: any, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      handleRemained={handleRemained}
                    />
                  ))}
                </ul>
              </SortableContext>
              <DragOverlay>
                {activeId ? <TaskMoveItem todoName={dragItemName} /> : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <div className="text-center mt-5">
              <CircularProgress />
            </div>
          )}
        </div>

        {/* 完了タスク */}
        <div className="mt-10 max-w-lg mx-auto">
          <p className="text-md font-bold block text-center">
            チェック済みタスク
          </p>
          {!isFinishLoad ? (
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
                      className="cursor-pointer w-[25px] h-[25px] shrink-0"
                      checked={task.isChecked}
                      onChange={(e) => handleCompleted(e)}
                    />
                    <p className="ml-4 line-through break-all">{task.todo}</p>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center mt-5">
              <CircularProgress />
            </div>
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
    </>
  );
};

export default TodoArea;
