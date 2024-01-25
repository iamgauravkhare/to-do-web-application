"use client";
import CreateToDo from "@/components/createToDo/CreateToDo";
import ShowToDoList from "@/components/showToDoList/ShowToDoList";
import React, { useContext, useEffect, useState } from "react";
import { centralisedData } from "../context";
import Illustration from "@/components/illustration/Illustration";
import Profile from "@/components/profile/Profile";
import ResetPassword from "@/components/resetPassword/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { removeLoading } from "@/store/reducers";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [consoleHead, setConsoleHead] = useState("Create");
  const [activeIndex, setActiveIndex] = useState(null);
  const [change, setChange] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskPrority, setTaskPrority] = useState("");
  const { loading, isAuthenticated } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(removeLoading());
  }, []);

  const {
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
  } = useContext(centralisedData);

  return (
    <>
      <div className="w-full bg-secondaryColor rounded-lg">
        {loading ? (
          <div className="w-full p-3 max-w-[1460px] min-h-[80vh] bg-secondaryColor rounded-lg flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="w-full p-3 min-h-screen bg-secondaryColor rounded-lg">
            <ShowToDoList
              userData={userData}
              setUserData={setUserData}
              taskTitle={taskTitle}
              setTaskTitle={setTaskTitle}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              change={change}
              setChange={setChange}
              consoleHead={consoleHead}
              setConsoleHead={setConsoleHead}
              taskDeadline={taskDeadline}
              taskPrority={taskPrority}
              setTaskDeadline={setTaskDeadline}
              setTaskPrority={setTaskPrority}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
