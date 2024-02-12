import React from "react";
import AddTaskFrom from "../../components/ui/Task/AddTask/AddTaskFrom";

const AddTask: React.FC = () => {
  return (
    <div className="px-6 py-6">
      <div className="text-5xl subpixel-antialiased font-semibold text-center py-4">
        <h1>Add New Task</h1>
      </div>
      <AddTaskFrom />
    </div>
  );
};

export default AddTask;
