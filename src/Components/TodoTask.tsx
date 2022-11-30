import React from "react";
import { ITask } from "../Interfaces";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div className="bg-gray-100 p-4 grid grid-cols-3 justify-between mb-2 rounded-md items-center w-full">
      <div className="text-md font-bold">{task.taskName}</div>
      <div className="text-center">{task.deadline}</div>
      <div className="self-end text-right">
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            completeTask(task.id);
          }}
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default TodoTask;
