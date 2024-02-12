import React from "react";
import { useTimerHook } from "../../../hooks/useTimerHook";
import moment from "moment";
import RemainingOrOverdue from "./components/RemainingOrOverdue";
import { getBgColorClass } from "../../../utils/common";
import { TaskModel } from "../../../models/TaskModel";
import TaskStatusDisplay from "./TaskStatus";

type TaskProps = {
    data:TaskModel;
    status: string | number;
    title: string;
    description: string;
    onClickView: (task: TaskModel) => void;
    onClickEdit: (task: TaskModel) => void;
    onClickDelete: (id: string | number) => void;
};

const Task: React.FC<TaskProps> = ({ title, description, status, data, onClickView, onClickEdit, onClickDelete}: TaskProps) => {
  const [timeLeft] = useTimerHook(moment(data.complete_on).format());
  return (
    <li  key={`${data.id}`} className={`flex-row justify-between gap-x-6 px-5 py-2 my-5 sm:my-0 bg-zinc-50	 sm:flex sm:py-3 ${getBgColorClass(timeLeft)} `}>
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto text-left">
        <div className="mt-1 flex items-center  justify-between gap-x-6 ">
          <TaskStatusDisplay status={status} />
          <div className="flex sm:hidden">
          <RemainingOrOverdue timeLeft={timeLeft} />
          </div>
        </div>
          <p className=" text-base sm:text-sm font-semibold leading-6 text-gray-900">
            {title}
          </p>
          <p className="mt-1 line-clamp-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
          Created: <time dateTime={data.created_at}>{data.created_at ? moment(data.created_at).format('lll') : null}</time>
        </p>
        <div className="hidden sm:flex">
          <RemainingOrOverdue timeLeft={timeLeft} />
        </div>
        </div>
      </div>
      <div className="flex flex-col sm:items-end text-xl">
        <button className="btn btn-outline btn-sm mt-1 w-full text-blue-500" type="button" onClick={()=>{ onClickEdit(data)}} >Edit</button>
        <button className="btn btn-outline btn-sm mt-1 w-full" type="button" onClick={() => onClickView(data)} >View</button>
        <button className="btn btn-outline btn-sm mt-1 w-full text-rose-500" type="button" onClick={() => onClickDelete(data.id)} >Delete</button>
        
      </div>
    </li>
  );
};

export default Task;
