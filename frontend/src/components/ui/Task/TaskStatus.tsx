import React from 'react'
import { useAppSelector } from '../../../hooks/redux-hooks';

type Props = {
    status: string | number
}

const TaskStatusDisplay:React.FC<Props> = (props: Props) => {

    const statuses = useAppSelector((state) => state.taskStatusReducer.taskStatusData);

    const status = statuses.find((status) => status.id == props.status);
  return (
    <div className="text-xs my-1 leading-5 text-gray-500">
        <div className="badge badge-ghost py-3 px-6">{status?.name}</div>
    </div>
  )
}

export default TaskStatusDisplay