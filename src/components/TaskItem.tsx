import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

type Props = {
  task: any;
  index: any;
  handleRemained?: any;
};

const TaskItem = ({ task, index, handleRemained }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  return (
    <li
      className="my-4 flex"
      key={task.id}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <button className="mr-3" {...listeners} {...attributes}>
        <DragIndicatorIcon />
      </button>
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
    </li>
  );
};

export default TaskItem;
