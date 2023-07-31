import React, { FC, useState } from "react";
import "./styles.css";
import { TaskItemType } from "../../types";
import CustomModal from "../CustomModal/CustomModal";
import AddNewItem from "../AddNewItem/AddNewItem";
import { toast } from "react-toastify";
import TaskItem from "../TaskItem/TaskItem";
import { ConnectDropTarget } from "react-dnd";

type taskListType = {
  title: string;
  dropRef: ConnectDropTarget;
  tasks: TaskItemType[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskItemType[]>>;
};

const TaskList: FC<taskListType> = ({ title, dropRef, tasks, setTaskList }) => {
  const [openEditTaskModal, setOpenEditTaskModal] = useState<boolean>(false);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState<string>("");
  const [selectedTaskescription, setSelectedTaskDescription] =
    useState<string>("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);

  const handleChangeTaskStatus = (id: string) => {
    setTaskList((prev) => {
      const mTasks = prev.map((task, i) => {
        if (task.id === id) {
          const updatedTask: TaskItemType = {
            ...task,
            completed: !task.completed,
          };
          return updatedTask;
        }
        return task;
      });
      return mTasks;
    });
  };
  const handleDeleteTask = (index: number) => {
    const updatedList = tasks.filter((_, i) => i !== index);
    setTaskList(updatedList);
    toast.error("Tasks Deleted Successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleOnClickTask = (index: number) => {
    setSelectedTaskTitle(tasks[index].title);
    setSelectedTaskDescription(tasks[index].description);
    setOpenEditTaskModal(true);
    setSelectedTaskIndex(index);
  };

  const handleEditTask = (title: string, description: string) => {
    const updatedTaskList = tasks.map((task, i) => {
      if (i === selectedTaskIndex) {
        const updatedTask = {
          ...task,
          title: title,
          description: description,
          completed: false,
        };
        return updatedTask;
      }
      return task;
    });

    setTaskList(updatedTaskList);
    toast.success("Tasks updated Successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div
      ref={dropRef}
      className="tasklistContainer"
      style={{
        backgroundColor:
          title === "All Tasks"
            ? "rgba(11, 131, 237,0.8)"
            : title === "In-Complete Tasks"
            ? "gold"
            : "green",
      }}
    >
      <h3>{title}</h3>
      <div style={{ height: "100%" }}>
        {tasks.length === 0 ? (
          <div className="noTaskContainer">No Tasks Available!</div>
        ) : (
          <ol>
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                handleOnClickTask={handleOnClickTask}
                handleDeleteTask={handleDeleteTask}
                index={index}
                task={task}
                handleChangeTaskStatus={handleChangeTaskStatus}
              />
            ))}
          </ol>
        )}
      </div>

      {selectedTaskTitle && selectedTaskescription && openEditTaskModal && (
        <CustomModal
          modalContent={
            <AddNewItem
              modalTitle="Edit Task"
              currentTitle={selectedTaskTitle}
              currentDescription={selectedTaskescription}
              setOpenModal={setOpenEditTaskModal}
              addNewItem={handleEditTask}
            />
          }
        />
      )}
    </div>
  );
};

export default TaskList;
