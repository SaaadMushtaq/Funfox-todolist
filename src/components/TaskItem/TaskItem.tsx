import React, { FC } from "react";
import { useDrag } from "react-dnd";
import { TaskItemType } from "../../types";

interface taskItemProps {
  handleOnClickTask: (index: number) => void;
  handleDeleteTask: (index: number) => void;
  index: number;
  task: TaskItemType;
}

const TaskItem: FC<taskItemProps> = ({
  handleOnClickTask,
  handleDeleteTask,
  index,
  task,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={isDragging ? "draggingListItem listItem" : "listItem"}
    >
      <p onClick={() => handleOnClickTask(index)}>
        {index + 1}. {task.title}
      </p>
      <div className="buttonGroup">
        <button
          className="deleteButton"
          onClick={() => handleDeleteTask(index)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
