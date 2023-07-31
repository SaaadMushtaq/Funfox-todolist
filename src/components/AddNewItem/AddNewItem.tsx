import React, { FC, useState } from "react";
import "./styles.css";

interface addNewItemProps {
  modalTitle: string;
  currentTitle: string;
  currentDescription: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  addNewItem: (title: string, description: string) => void;
}

const AddNewItem: FC<addNewItemProps> = ({
  modalTitle,
  setOpenModal,
  addNewItem,
  currentTitle,
  currentDescription,
}) => {
  const [title, setTitle] = useState<string>(currentTitle);
  const [description, setDescription] = useState<string>(currentDescription);

  const disableCheck = title === "" || description === "";

  const handleAddNewItem = () => {
    addNewItem(title, description);
    setTitle("");
    setDescription("");
    setOpenModal(false);
  };
  return (
    <div className="newTaskContainer">
      <h3>{modalTitle}</h3>
      <span>
        <p>Title</p>
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </span>
      <span>
        <p>Description</p>
        <textarea
          placeholder="Description...."
          rows={10}
          cols={20}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </span>
      <span className="buttonGroup">
        <button
          className={disableCheck ? "disabledButton" : "saveButton"}
          disabled={disableCheck}
          onClick={handleAddNewItem}
        >
          Save
        </button>
        <button className="cancelButton" onClick={() => setOpenModal(false)}>
          Cancel
        </button>
      </span>
    </div>
  );
};

export default AddNewItem;
