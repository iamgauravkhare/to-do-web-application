"use client";
import { toast } from "react-toastify";
import style from "./CreateToDo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncCreateTask, asyncUpdateTask } from "@/store/actions";

const CreateToDo = (props) => {
  const { userData } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();
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

  const submitHandler = async () => {
    const taskData = {
      title: taskTitle,
      description: taskDescription,
    };
    await dispatch(asyncCreateTask(taskData));
    setChange(true);
    setTaskTitle("");
    setTaskDescription("");
  };

  const saveEditDataHandler = () => {
    const updatedTaskData = {
      title: taskTitle,
      description: taskDescription,
    };
    const taskId = userData.tasks[activeIndex].id;
    dispatch(asyncUpdateTask(updatedTaskData, taskId));
    setTaskTitle("");
    setTaskDescription("");
    setConsoleHead("Create")
    setActiveIndex(null);
  };

  return (
    <div className={` ${style.createToDo}`}>
      <form className="form" autoComplete="off">
        <h6 className="form-heading">{consoleHead} Your Task</h6>
        <div className="text-field">
          <label htmlFor="email">Task Title</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div className="text-field">
          <label htmlFor="email">Task Discription</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={taskDescription}
            className="textarea"
            placeholder="Enter Task Description"
            onChange={(e) => setTaskDescription(e.target.value)}
            style={{ marginTop: "5px", color: "var(--primaryColor)" }}
          ></textarea>
        </div>

        <div className={style.btnCtn}>
          {activeIndex !== null ? (
            <button
              type="button"
              className="btns"
              onClick={saveEditDataHandler}
            >
              Edit Task
            </button>
          ) : (
            <button type="button" onClick={submitHandler} className="btns">
              Add Task
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateToDo;
