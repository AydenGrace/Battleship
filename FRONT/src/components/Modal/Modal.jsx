import React, { useEffect, useState } from "react";
import style from "./Modal.module.scss";

export default function Modal({
  showModal = true,
  children,
  OnClose = () => {},
}) {
  const [display, setDisplay] = useState(showModal);

  useEffect(() => {
    setDisplay(showModal);
  }, [showModal]);

  const handleClose = (e) => {
    e.stopPropagation();
    setDisplay(false);
    OnClose();
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {display && (
        <div
          className={`${style.overlay} f-center`}
          onClick={(e) => {
            handleClose(e);
          }}
        >
          <div
            className={`${style.modal} flex-column`}
            onClick={(e) => handleClick(e)}
          >
            <div className="d-flex w-100 justify-content-end mb-20">
              <i
                className="fa-solid fa-xmark fa-2xl mb-10 pointer"
                onClick={(e) => handleClose(e)}
              ></i>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
