import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type Props = {
  task: any;
  index: UniqueIdentifier;
  handleRemained?: any;
};

const TaskItem = ({ task, index, handleRemained }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id.toString(),
    });

  return (
    <li
      className="my-4"
      key={task.id}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
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
        <p className="ml-4 relative w-[90%]">{task.todo}</p>
      </label>
      <button {...listeners} {...attributes}>
        ここを掴む
      </button>
    </li>
  );
};

export default TaskItem;
