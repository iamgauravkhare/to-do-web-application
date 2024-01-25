"use client";
import { toast } from "react-toastify";
import style from "./CreateToDo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncCreateTask, asyncUpdateTask } from "@/store/actions";
import { addLoading, removeLoading } from "@/store/reducers";

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
    setShowModal,
    taskDeadline,
    taskPrority,
    setTaskDeadline,
    setTaskPrority,
  } = props;

  const submitHandler = async () => {
    dispatch(addLoading());
    const taskData = {
      title: taskTitle,
      description: taskDescription,
      deadline: taskDeadline,
      priority: taskPrority,
    };

    await dispatch(asyncCreateTask(taskData));
    setChange(true);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline("");
    setTaskPrority("");
    setShowModal(false);
  };

  const saveEditDataHandler = () => {
    dispatch(addLoading());
    const updatedTaskData = {
      title: taskTitle,
      description: taskDescription,
      deadline: taskDeadline,
      priority: taskPrority,
    };
    const taskId = activeIndex;
    dispatch(asyncUpdateTask(updatedTaskData, taskId));
    setTaskTitle("");
    setTaskDescription("");
    setConsoleHead("Create");
    setActiveIndex(null);
    setShowModal(false);
    setTaskDeadline("");
    setTaskPrority("");
  };

  const modalCancelHandler = () => {
    setTaskTitle("");
    setTaskDescription("");
    setConsoleHead("Create");
    setActiveIndex(null);
    setShowModal(false);
    setTaskDeadline("");
    setTaskPrority("");
  };

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[50%] rounded-lg bg-secondaryColor p-3">
      <div className="w-full rounded-lg bg-backgroundColor p-3 flex flex-col">
        <form className="form" autoComplete="off">
          <h6 className="form-heading">{consoleHead} Your Task</h6>
          <div className="text-field">
            <label htmlFor="email">Task Title</label>
            <input
              type="text"
              id="email"
              required="true"
              name="email"
              placeholder="Enter Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-5 flex-col md:flex-row lg:flex-row">
            <div className="text-field">
              <label htmlFor="email">Select Prority</label>
              <div className="flex text-[15px] font-[500] gap-5 items-center px-[15px] border-2 rounded-[5px] h-[48px] mt-[5px] bg-secondaryColor">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="low"
                    name="prority"
                    required
                    checked={taskPrority === "low"}
                    value="low"
                    onChange={(e) => setTaskPrority(e.target.value)}
                  />
                  <label htmlFor="low">Low</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    required
                    id="medium"
                    name="prority"
                    checked={taskPrority === "medium"}
                    value="medium"
                    onChange={(e) => setTaskPrority(e.target.value)}
                  />
                  <label htmlFor="medium">Medium</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="high"
                    required
                    name="prority"
                    checked={taskPrority === "high"}
                    value="high"
                    onChange={(e) => setTaskPrority(e.target.value)}
                  />
                  <label htmlFor="high">High</label>
                </div>
              </div>
            </div>
            <div className="text-field ">
              <label htmlFor="date">Deadline</label>
              <input
                type="date"
                required
                id="date"
                name="email"
                className="uppercase"
                style={{ paddingLeft: "15px", textIndent: "0px" }}
                onChange={(e) =>
                  setTaskDeadline(
                    new Date(e.target.value).toISOString().split("T")[0]
                  )
                }
                value={taskDeadline}
              />
            </div>
          </div>

          <div className="text-field">
            <label htmlFor="email">Task Discription</label>
            <textarea
              name=""
              id=""
              cols="20"
              rows="5"
              required
              value={taskDescription}
              className="textarea"
              placeholder="Enter Task Description"
              onChange={(e) => setTaskDescription(e.target.value)}
              style={{ marginTop: "5px", color: "var(--primaryColor)" }}
            ></textarea>
          </div>

          <div className={`${style.btnCtn} flex-wrap`}>
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
            <button type="button" onClick={modalCancelHandler} className="btns">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateToDo;
