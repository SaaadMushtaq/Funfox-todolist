import React, { FC } from "react";
import UserGroup from "../Usergroup/UserGroup";
import "./styles.css";
import { UserGroupType } from "../../types";

interface userGroupListProps {
  groupList: UserGroupType[];
}
const UserGroupList: FC<userGroupListProps> = ({ groupList }) => {
  return (
    <div className="userGroupListContainer">
      <h3>Groups</h3>
      {groupList.map((group, index) => (
        <UserGroup
          key={index}
          title={group.title}
          description={group.description}
        />
      ))}
    </div>
  );
};

export default UserGroupList;
