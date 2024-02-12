import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/redux-hooks";
import { TaskModel } from "../../../../models/TaskModel";
import { TaskStatusModel } from "../../../../models/TaskStatusModel";

type FilterType = {
  onChange: (value: string | number) => void;
  selected: string | number;
  options: { label: string; value: string | number }[];
};

const FilterSelect: React.FC<FilterType> = ({
  onChange,
  selected,
  options,
}: FilterType) => {
  return (
    <select
      value={selected}
      className="select select-bordered w-full"
      onChange={(e) => onChange(e.target.value)}
    >
      {options &&
        options.map((option, index) => (
          <option key={`${option.value}${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

type Props = {
  data: TaskModel[];
  renderFnc: (filterItems: TaskModel[]) => JSX.Element;
};

function FilterTask({ data, renderFnc }: Props) {
  const [filterData, setFilterData] = useState<TaskModel[]>(data);

  const taskStatues = useAppSelector(
    (state) => state.taskStatusReducer.taskStatusData
  );
  const [selected, setSelected] = useState<string | number>("");

  const filterOptions = [
    { label: "All", value: "" },
    ...taskStatues.map((taskStatus: TaskStatusModel) => {
      return {
        label: taskStatus.name,
        value: taskStatus.id,
      };
    }),
  ];

  const applyFilter = (status: string | number) => {
    if (status) {
      setFilterData(
        data.filter((task) => {
          return task.status == status;
        })
      );
    } else {
      setFilterData(data);
    }
    setSelected(status);
  };

  useEffect(() => {
    setFilterData(data);
  }, [data]);
  return (
    <>
      <div className="text-5xl subpixel-antialiased font-semibold text-center w-full sm:w-1/6">
        <FilterSelect
          selected={selected}
          onChange={(value) => {
            applyFilter(value);
          }}
          options={filterOptions}
        />
      </div>
      {renderFnc(filterData)}
    </>
  );
}

export default FilterTask;
