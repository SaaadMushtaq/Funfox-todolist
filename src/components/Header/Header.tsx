import React, { FC } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";

interface headerProps {
  setOpenAddTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAddGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<headerProps> = ({
  setOpenAddTaskModal,
  setOpenAddGroupModal,
}) => {
  const location = useLocation();
  return (
    <div className="headerContainer">
      <p>FunFox</p>
      <button
        onClick={() => {
          if (location.pathname === "/") {
            setOpenAddGroupModal(true);
          } else {
            setOpenAddTaskModal(true);
          }
        }}
      >
        {location.pathname === "/" ? "Add Group" : "Add Task"}
      </button>
    </div>
  );
};

export default Header;
