import React, { FC } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

interface userGroupProps {
  title: string;
  description: string;
}

const UserGroup: FC<userGroupProps> = ({ title, description }) => {
  return (
    <div className="userGroupContainer">
      <Link to="/tasks">
        <h4>{title}</h4>
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default UserGroup;
