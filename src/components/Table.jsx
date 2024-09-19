import { Moon, SendHorizonal, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Table = ({ darkMode, toggleDrkMode }) => {
  // useState Variables
  const [inp, setInp] = useState("");
  const [tasks, setTasks] = useState([]); // tasks will hold all tasks with their status (completed or not)
  const [page, setPage] = useState("all");

  // Functions
  const teskCompleted = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const changingPages = (value) => {
    setPage(value);
  };

  const sendingToList = (inpValue) => {
    if (inpValue === "") {
      toast.error("Please fill the input field");
    } else {
      toast.success("Task added successfully");
      const newTask = { id: Date.now(), name: inpValue, completed: false };
      setTasks([...tasks, newTask]);
      setInp("");
    }
  };

  // useEffect(() => {
  //   console.log("tasks:", tasks);
  // }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (page === "all") return true;
    if (page === "active") return !task.completed;
    if (page === "completed") return task.completed;
  });

  return (
    <div className="w-[95%] h-[90%] p-2 z-10 flex flex-col lg:w-[40%]">
      <div className="w-full h-[10%] flex justify-between items-center">
        <h1 className="text-5xl font-bold text-white tracking-widest">TODO</h1>
        {darkMode ? (
          <Moon
            onClick={toggleDrkMode}
            className="text-white size-8 cursor-pointer"
          />
        ) : (
          <Sun
            onClick={toggleDrkMode}
            className="text-white size-8 cursor-pointer"
          />
        )}
      </div>
      <div className="w-full h-[20%] flex justify-between items-center">
        <div
          className={`w-full h-[60%] rounded-md flex items-center px-4 gap-2 ${
            darkMode ? "bg-slate-700" : "bg-white"
          }`}
        >
          <input
            type="text"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            className={`w-[90%] h-full focus:outline-none text-xl text-black ${
              darkMode ? "bg-slate-700 text-white" : "bg-white"
            }`}
          />
          {inp && (
            <SendHorizonal
              onClick={() => sendingToList(inp)}
              className={`size-8 cursor-pointer ${
                darkMode ? "text-white" : "text-black"
              }`}
            />
          )}
        </div>
      </div>

      <div
        className={`w-full relative shadow rounded-lg gap-2 h-[80%] flex flex-col py-1 overflow-x-hidden overflow-y-auto ${
          darkMode ? "bg-slate-700" : "bg-white"
        }`}
      >
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`w-full h-16 rounded-lg px-4 shadow flex items-center ${
              darkMode ? "bg-slate-700 text-white" : "bg-white"
            }`}
          >
            <div
              onClick={() => teskCompleted(task.id)}
              className={`w-7 h-7 border rounded-full flex justify-center items-center ${
                task.completed
                  ? "bg-gradient-to-tr from-indigo-600 to-fuchsia-800"
                  : ""
              }`}
            >
              {task.completed && (
                <img
                  src="/icon-check.svg"
                  className="w-[50%] h-[50%] rounded-full"
                  alt="Checked"
                />
              )}
            </div>
            <h1
              className={`w-[70%] h-full flex items-center text-xl ml-5 ${
                task.completed ? "line-through text-gray-800" : ""
              }`}
            >
              {task.name}
            </h1>
          </div>
        ))}

        <div className="w-full absolute bottom-0 h-10 flex items-center">
          <div className="lg:w-[33.33%] w-[30%] h-full flex justify-center items-center p-2">
            <h1 className="text-gray-500 text-xs lg:text-lg">
              {tasks.filter((task) => !task.completed).length} Items Left
            </h1>
          </div>

          <div className="lg:w-[33.33%] w-[45%] lg:gap-2 h-full flex items-center justify-around ">
            <a
              onClick={() => changingPages("all")}
              className={`cursor-pointer text-xs lg:text-lg ${
                page === "all" ? "text-white" : "text-gray-600"
              } hover:text-blue-500`}
            >
              All
            </a>
            <a
              onClick={() => changingPages("active")}
              className={`cursor-pointer text-xs lg:text-lg ${
                page === "active" ? `text-white` : "text-gray-600"
              } hover:text-blue-500`}
            >
              Active
            </a>
            <a
              onClick={() => changingPages("completed")}
              className={`cursor-pointer text-xs lg:text-lg ${
                page === "completed" ? "text-white" : "text-gray-600"
              } hover:text-blue-500`}
            >
              Completed
            </a>
          </div>

          <div className="w-[33.33%] h-full flex justify-center items-center">
            <a
              onClick={() => clearCompleted()}
              className="text-gray-500 hover:text-white text-xs lg:text-lg"
            >
              Clear Completed
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
