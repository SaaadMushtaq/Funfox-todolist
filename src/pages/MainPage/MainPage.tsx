import React, { FC, useState } from "react";
import "./styles.css";
import CustomModal from "../../components/CustomModal/CustomModal";
import UserGroupList from "../../components/UserGroupList/UserGroupList";
import AddNewItem from "../../components/AddNewItem/AddNewItem";
import { UserGroupType } from "../../types";
import { toast } from "react-toastify";

interface mainPageProps {
  openAddGroupModal: boolean;
  setOpenAddGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const tempUserGroups: UserGroupType[] = [
  {
    title: "workout routine",
    description: "This involves all the excercises i usually do",
  },
  {
    title: "house chores",
    description: "This involves all the house chores i usually do",
  },
];

const MainPage: FC<mainPageProps> = ({
  openAddGroupModal,
  setOpenAddGroupModal,
}) => {
  const [groupList, setGroupList] = useState<UserGroupType[]>(tempUserGroups);

  const addNewGroup = (title: string, description: string) => {
    setGroupList((list) => [
      ...list,
      { title: title, description: description },
    ]);
    toast.success("Group Added Successfully!", {
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
    <div className="mainPageContainer">
      <UserGroupList groupList={groupList} />
      {openAddGroupModal && (
        <CustomModal
          modalContent={
            <AddNewItem
              modalTitle="Add Group"
              setOpenModal={setOpenAddGroupModal}
              addNewItem={addNewGroup}
              currentTitle=""
              currentDescription=""
            />
          }
        />
      )}
    </div>
  );
};

export default MainPage;
