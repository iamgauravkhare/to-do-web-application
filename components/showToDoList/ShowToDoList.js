"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteTask, asyncMarkTaskCompleted } from "@/store/actions";
import { centralisedData } from "@/app/context";
import { useRouter } from "next/navigation";
import CreateToDo from "../createToDo/CreateToDo";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgAddR } from "react-icons/cg";
import { AiOutlineClear } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const ShowToDoList = (props) => {
  const elemRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("Select Date");
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { userData } = useSelector((state) => state.userSlice);

  const groupedTodos =
    userData &&
    userData.tasks.reduce((acc, todo) => {
      const date = new Date(todo.createdAt).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(todo);

      return acc;
    }, {});

  const uniqueDates = userData && Object.keys(groupedTodos);
  // Convert date strings to Date objects
  const dateObjects =
    uniqueDates &&
    uniqueDates.map((dateString) => {
      const [month, day, year] = dateString.split("/");
      return new Date(`${year}-${month}-${day}`);
    });

  // Sort the Date objects in descending order
  const sortedDateObjects = dateObjects && dateObjects.sort((a, b) => b - a);

  // Convert Date objects back to strings in 'M/D/YYYY' format
  const sortedDates =
    sortedDateObjects &&
    sortedDateObjects.map((date) => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    });

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
    taskDeadline,
    taskPrority,
    setTaskDeadline,
    setTaskPrority,
  } = props;

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
    darkMode,
    setDarkMode,
  } = useContext(centralisedData);

  useEffect(() => {
    if (change) {
      // const elem = elemRef.current;
      // elem.scrollTo(0, elem.scrollHeight);
      setChange(null);
    }
  }, [change]);

  const deleteHandler = (id) => {
    const { _id } = userData.tasks.find((obj) => obj._id === id);
    dispatch(asyncDeleteTask(_id));
  };

  const filterHandler = (value, index) => {
    setFilter(value);
  };

  const editHandler = (id) => {
    setShowModal(true);
    setConsoleHead("Edit");
    window.scrollTo(0, 0);
    setActiveIndex(id);
    const activeTodoData = userData.tasks.find((obj) => obj._id === id);
    setTaskTitle(activeTodoData.title);
    setTaskDescription(activeTodoData.description);
    setTaskDeadline(
      new Date(activeTodoData.deadline).toISOString().split("T")[0]
    );
    setTaskPrority(activeTodoData.priority);
    // router.push("/create-task");
  };

  const markCompleteHandler = (id) => {
    dispatch(asyncMarkTaskCompleted(id));
  };

  let taskData = (
    <p className="p-5 bg-secondaryColor text-center font-[500] rounded-lg">
      {" "}
      No Task Available
    </p>
  );
  if (userData && userData.tasks.length > 0) {
    taskData =
      sortedDates &&
      sortedDates.length > 0 &&
      sortedDates.map((date, i) => {
        return (
          <div
            key={i}
            className="w-full bg-secondaryColor rounded-lg p-3 md:p-5 lg:p-5 gap-5 flex flex-col"
          >
            <h1>{new Date(date).toDateString()}</h1>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-5 relative">
              {groupedTodos[date].map((e, i) => {
                return (
                  <div
                    className="mb-5 overflow-hidden bg-[#F0F8FF] text-[14px]  font-[450] flex flex-col gap-5 rounded-lg p-5 hover:shadow-lg transition-shadow"
                    key={i}
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h4 className="text-[16px] font-semibold">{e.title}</h4>
                      <button
                        className="text-[10px] flex flex-row-reverse gap-3 font-semibold bg-secondaryColor py-1 px-3 rounded-md border-none items-center"
                        onClick={() => markCompleteHandler(e._id)}
                      >
                        {e.completed ? "Completed" : "Mark Completed"}
                        {e.completed ? (
                          <IoCheckmarkDoneSharp className="text-2xl text-[#32de84]" />
                        ) : (
                          <IoCheckmarkSharp className="text-2xl" />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-between items-center gap-3 flex-wrap">
                      <span>
                        Added On -
                        <br />
                        {new Date(e.createdAt).toDateString()}
                      </span>
                      <div className="flex gap-3">
                        <button
                          className="p-2 bg-secondaryColor text-[20px] rounded-full"
                          onClick={() => editHandler(e._id)}
                        >
                          <FaEdit />
                        </button>

                        {activeIndex === i ? (
                          <></>
                        ) : (
                          <button
                            className="p-2 bg-secondaryColor text-[20px] rounded-full"
                            onClick={() => deleteHandler(e._id)}
                          >
                            <MdDelete />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-3 flex-wrap">
                      <p className="">
                        Due Date -
                        <br />
                        {new Date(e.deadline).toDateString()}
                      </p>
                      <p className="capitalize">Priority - {e.priority}</p>
                    </div>
                    <div className="text-[14px] font-450">
                      Description -<br />
                      <pre className="mt-2 text-wrap">
                        <p>{e.description}</p>
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
  }

  return (
    <>
      {userData && (
        <div className="w-full max-w-[1460px] mx-auto flex flex-col gap-3 bg-backgroundColor rounded-lg p-3">
          <div className="flex gap-5 items-center justify-between p-3 bg-secondaryColor flex-wrap flex-col-reverse md:flex-row lg:flex-row rounded-lg">
            <h4 className="font-semibold text-primaryColor text-xl">
              Your created tasks
            </h4>
            <div className="flex items-center flex-col md:flex-row lg:flex-row gap-5">
              <button
                className="btns"
                style={{ margin: "0px" }}
                onClick={() => setShowModal(true)}
              >
                Add Task
              </button>
              {/* <button
                className="btns flex md:hidden lg:hidden"
                onClick={() => setShowModal(true)}
              >
                <CgAddR className="text-xl" />
              </button> */}
              <div
                name=""
                id=""
                className="px-[30px] py-[10px] pr-[24px] border-2 border-primaryColor rounded-md relative cursor-pointer flex items-center gap-3 text-[15px] font-[500] select-text"
                onClick={() => setShowFilter((prev) => !prev)}
              >
                {showFilter && (
                  <div className="px-2 w-full pl-3 h-[172px] items-center overflow-scroll py-5 shadow-lg flex flex-col gap-5 rounded-md bg-secondaryColor z-[1] absolute top-[120%] left-0">
                    {sortedDates ? (
                      sortedDates.map((date, i) => {
                        return (
                          <button
                            value=""
                            key={i}
                            style={{ margin: "0px", padding: "8px" }}
                            className="btns w-full"
                            onClick={() => filterHandler(date, i)}
                          >
                            {new Date(date).toDateString()}
                          </button>
                        );
                      })
                    ) : (
                      <p>No filter available</p>
                    )}
                  </div>
                )}
                {filter} <IoMdArrowDropdown className="text-[20px]" />
              </div>
              <button
                className="btns"
                style={{ margin: "0px" }}
                onClick={() => setFilter("Select Date")}
              >
                Clear Filter
              </button>
              {/* <button
                className="btns flex md:hidden lg:hidden"
                style={{ margin: "0px" }}
                onClick={() => setFilter("Select Date")}
              >
                <AiOutlineClear className="text-xl" />
              </button> */}
            </div>
          </div>
          <div className="w-full flex gap-5 flex-col">
            {filter !== "Select Date" ? (
              <div className="w-full bg-secondaryColor rounded-lg p-5 gap-5 flex flex-col">
                <h1>{new Date(filter).toDateString()}</h1>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-5 relative">
                  {userData &&
                    groupedTodos[filter].map((e, i) => {
                      return (
                        <div
                          className="mb-5 overflow-hidden bg-[#F0F8FF] text-[14px]  font-[450] flex flex-col gap-5 rounded-lg p-5 hover:shadow-lg transition-shadow"
                          key={i}
                        >
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <h4 className="text-[16px] font-semibold">
                              {e.title}
                            </h4>
                            <button
                              className="text-[10px] flex flex-row-reverse gap-3 font-semibold bg-secondaryColor py-1 px-3 rounded-md border-none items-center"
                              onClick={() => markCompleteHandler(e._id)}
                            >
                              {e.completed ? "Completed" : "Mark Completed"}
                              {e.completed ? (
                                <IoCheckmarkDoneSharp className="text-2xl text-[#32de84]" />
                              ) : (
                                <IoCheckmarkSharp className="text-2xl" />
                              )}
                            </button>
                          </div>
                          <div className="flex justify-between items-center gap-3 flex-wrap">
                            <span>
                              Added On -
                              <br />
                              {new Date(e.createdAt).toDateString()}
                            </span>
                            <div className="flex gap-3">
                              <button
                                className="p-2 bg-secondaryColor text-[20px] rounded-full"
                                onClick={() => editHandler(e._id)}
                              >
                                <FaEdit />
                              </button>

                              {activeIndex === i ? (
                                <></>
                              ) : (
                                <button
                                  className="p-2 bg-secondaryColor text-[20px] rounded-full"
                                  onClick={() => deleteHandler(e._id)}
                                >
                                  <MdDelete />
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-3 flex-wrap">
                            <p className="">
                              Due Date -
                              <br />
                              {new Date(e.deadline).toDateString()}
                            </p>
                            <p className="capitalize">
                              Priority - {e.priority}
                            </p>
                          </div>
                          <div className="text-[14px] font-450">
                            Description -<br />
                            <pre className="mt-2 text-wrap">
                              <p>{e.description}</p>
                            </pre>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              taskData
            )}
          </div>
          {showModal && (
            <div className="w-full h-full bg-[rgba(0,0,0,0.4)] absolute top-0 left-0">
              <div className="text-2xl w-full flex items-center justify-center text-white pt-5">
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
                  setShowModal={setShowModal}
                  taskDeadline={taskDeadline}
                  taskPrority={taskPrority}
                  setTaskDeadline={setTaskDeadline}
                  setTaskPrority={setTaskPrority}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShowToDoList;
