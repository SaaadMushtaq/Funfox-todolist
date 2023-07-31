import React, { useState } from "react";
import MainPage from "./pages/MainPage/MainPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [openAddGroupModal, setOpenAddGroupModal] = useState<boolean>(false);

  const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Header
        setOpenAddTaskModal={setOpenAddTaskModal}
        setOpenAddGroupModal={setOpenAddGroupModal}
      />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              openAddGroupModal={openAddGroupModal}
              setOpenAddGroupModal={setOpenAddGroupModal}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TasksPage
              openAddTaskModal={openAddTaskModal}
              setOpenAddTaskModal={setOpenAddTaskModal}
            />
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
