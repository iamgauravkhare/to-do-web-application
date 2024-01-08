"use client";
import { useContext, useEffect, useRef } from "react";
import style from "./ShowToDoList.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteTask } from "@/store/actions";
import { centralisedData } from "@/app/context";

const ShowToDoList = (props) => {
  const elemRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userSlice);
  const {
    setUserData,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    activeIndex,
    setActiveIndex,
    change,
    setChange,
    consoleHead,
    setConsoleHead,
  } = props;

  const [
    showSignIn,
    setShowSignIn,
    showLandingPageHeading,
    setShowLandingPageHeading,
    showSignUp,
    setShowSignUp,
    showForgetPassword,
    setShowForgetPassword,
    showSetForgetPassword,
    setShowSetForgetPassword,
    illustration,
    setIllustration,
    profile,
    setProfile,
    editProfile,
    setEditProfile,
    resetPassword,
    setResetPassword,
    showToDo,
    setShowToDo,
    createToDo,
    setCreateToDo,
    showIllusCtn,
    setShowIllusCtn,
    darkMode,
    setDarkMode,
  ] = useContext(centralisedData);

  useEffect(() => {
    if (change) {
      const elem = elemRef.current;
      elem.scrollTo(0, elem.scrollHeight);
      setChange(null);
    }
  }, [change]);

  const deleteHandler = (i) => {
    const taskId = userData.tasks[i].id;
    dispatch(asyncDeleteTask(taskId));
  };

  const editHandler = (i) => {
    setConsoleHead("Edit");
    window.scrollTo(0, 0);
    setActiveIndex(i);
    setTaskTitle(userData.tasks[i].title);
    setTaskDescription(userData.tasks[i].description);
  };

  let taskData = <p>No Task Available</p>;
  if (userData) {
    if (userData.tasks.length > 0) {
      taskData = userData.tasks.map((e, i) => {
        return (
          <div className={style.taskCtn} key={i}>
            <h4 className="task-title">{e.title}</h4>
            <div className={style.cardNav}>
              <span>{e.addedOn}</span>
              <div className="btns-ctn">
                <button className="icn-btns" onClick={() => editHandler(i)}>
                  {!darkMode ? (
                    <img src="/editButtonLogoM.png" alt="" />
                  ) : (
                    <img src="/editLogo.png" alt="" />
                  )}
                </button>
                {activeIndex === i ? (
                  <></>
                ) : (
                  <button className="icn-btns" onClick={() => deleteHandler(i)}>
                    {!darkMode ? (
                      <img src="/deleteButtonLogoM.png" alt="" />
                    ) : (
                      <img src="/deleteLogo.png" alt="" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <p>{e.description}</p>
          </div>
        );
      });
    }
  }

  return (
    <div className={`${style.showToDo}`}>
      <h4 className="form-heading">Your created tasks</h4>
      <div className={style.toDoCardCtn} ref={elemRef}>
        {taskData}
      </div>
    </div>
  );
};

export default ShowToDoList;
