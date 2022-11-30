import React, { FC, ChangeEvent, useState, useEffect } from "react";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";
import { v4 as uuidv4 } from "uuid";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  useEffect(() => {
    if (localStorage.getItem("tasks") !== null) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")!);
      setTodoList(savedTasks);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    if (!task) {
      alert("Please add a valid task");
      return;
    }

    let myuuid = uuidv4();

    const newTask = { taskName: task, deadline: deadline, id: myuuid };
    setTodoList([...todoList, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...todoList, newTask]));
    setTask("");
    setDealine(0);
  };

  const completeTask = (id: string): void => {
    const filteredTodos = todoList.filter((task) => {
      return task.id !== id;
    });

    setTodoList(filteredTodos);
    localStorage.setItem("tasks", JSON.stringify(filteredTodos));
  };

  return (
    <div className="mx-auto max-w-3xl p-10">
      <h1 className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl mb-10">
        Just Another Todo App
      </h1>

      <div className="grid grid-cols-3 flex-row gap-2 text-sm mb-1">
        <div>Title</div>
        <div>Deadline</div>
      </div>

      <div className="grid grid-cols-3 flex-row gap-2">
        <div>
          <label htmlFor="email" className="sr-only">
            task
          </label>
          <input
            type="text"
            name="task"
            id="task"
            value={task}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Task..."
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Deadline
          </label>
          <input
            type="number"
            name="deadline"
            id="deadline"
            value={deadline}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Deadline (in Days)...."
          />
        </div>
        <div className="self-end text-right">
          <button
            onClick={addTask}
            type="button"
            className="inline-flex text-right items-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="mt-4">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
