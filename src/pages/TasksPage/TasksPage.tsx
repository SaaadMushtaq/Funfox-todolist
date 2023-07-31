import React, { useState, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import TaskList from "../../components/TaskList/TaskList";
import CustomModal from "../../components/CustomModal/CustomModal";
import { TaskItemType } from "../../types";
import AddNewItem from "../../components/AddNewItem/AddNewItem";
import { toast } from "react-toastify";
import { useDrop } from "react-dnd";

interface tasksPageProps {
  openAddTaskModal: boolean;
  setOpenAddTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const tempTasksList: TaskItemType[] = [
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d+1",
    title: "go to gym",
    description: "get up from your ass and start working out you fat shit",
    completed: false,
  },
  {
    id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed+2",
    title: "start working hard",
    description: "wrold is a shitty place. Either keep up or die",
    completed: false,
  },
  {
    id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed+3",
    title: "complete the task",
    description: "wrold is a shitty place. Either keep up or die",
    completed: false,
  },
];
const TasksPage: FC<tasksPageProps> = ({
  openAddTaskModal,
  setOpenAddTaskModal,
}) => {
  const [taskList, setTaskList] = useState<TaskItemType[]>(tempTasksList);

  const addItemToSection = (id: string) => {
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

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: any) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver,
    }),
  }));

  const addNewTask = (title: string, description: string) => {
    setTaskList((list) => [
      ...list,
      {
        id: uuidv4(),
        title: title,
        description: description,
        completed: false,
      },
    ]);

    toast.success("Task Added Successfully!", {
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
    <div className="tasksPageContainer">
      <div className="tasksActionContainer">
        <TaskList
          dropRef={drop}
          title="All Tasks"
          tasks={taskList.filter((task) => task.completed === false)}
          setTaskList={setTaskList}
        />

        <TaskList
          dropRef={drop}
          title="Completed Tasks"
          tasks={taskList.filter((task) => task.completed === true)}
          setTaskList={setTaskList}
        />
      </div>
      {openAddTaskModal && (
        <CustomModal
          modalContent={
            <AddNewItem
              modalTitle="Add Task"
              setOpenModal={setOpenAddTaskModal}
              addNewItem={addNewTask}
              currentTitle=""
              currentDescription=""
            />
          }
        />
      )}
    </div>
  );
};

export default TasksPage;
