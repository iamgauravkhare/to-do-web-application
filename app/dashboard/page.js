"use client";
import CreateToDo from "@/components/createToDo/CreateToDo";
import ShowToDoList from "@/components/showToDoList/ShowToDoList";
import React, { useContext, useState } from "react";
import { centralisedData } from "../context";
import Illustration from "@/components/illustration/Illustration";
import Profile from "@/components/profile/Profile";
import ResetPassword from "@/components/resetPassword/ResetPassword";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [consoleHead, setConsoleHead] = useState("Create");
  const [activeIndex, setActiveIndex] = useState(null);
  const [change, setChange] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
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
  ] = useContext(centralisedData);
  return (
    <>
      <div
        className={`common-content-ctn ${
          showIllusCtn ? "dashboard-ctn-m" : "dashboard-ctn"
        }`}
      >
        {createToDo && (
          <CreateToDo
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
          />
        )}
        {showToDo && (
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
          />
        )}
        {showIllusCtn && <Illustration imageSrc={illustration} />}
        {profile && <Profile />}
        {resetPassword && <ResetPassword />}
      </div>
    </>
  );
};

export default Dashboard;
