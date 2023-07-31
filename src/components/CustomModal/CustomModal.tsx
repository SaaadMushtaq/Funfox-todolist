import React, { FC, ReactNode } from "react";
import "./styles.css";

interface customModalProps {
  modalContent: ReactNode;
}

const CustomModal: FC<customModalProps> = ({ modalContent }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">{modalContent}</div>
    </div>
  );
};

export default CustomModal;
