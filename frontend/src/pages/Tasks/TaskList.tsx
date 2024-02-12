import React, { useEffect, useState } from "react";
import Task from "../../components/ui/Task/Task";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchTaskStatus } from "../../store/api/TaskStatusApi/TaskStatusApi";
import FilterTask from "../../components/ui/Task/FilterTask/FilterTask";
import CustomModal from "../../components/Modal";
import { TaskModel } from "../../models/TaskModel";
import TaskDetail from "../../components/ui/Task/TaskDetail/TaskDetail";
import { deleteTask, fetchTasks } from "../../store/api/TaskApi/TaskApi";
import EditTaskFrom from "../../components/ui/Task/EditTask/EditTask";
import { Link } from "react-router-dom";

// const data = [
//   {
//     id: 1,
//     title: "First Task",
//     description:
//       "Pellentesque laoreet tristique purus a ultricies. Sed eleifend semper ligula vel semper. Fusce vel ante euismod dui varius vulputate. Cras vitae nisi dolor. Etiam faucibus placerat odio, ac gravida ligula. Sed quis lorem mi. Curabitur est nunc, maximus et ligula eu, fermentum ultrices nisl. Nunc nec justo a ligula lobortis ultricies. Nam dapibus massa sit amet diam feugiat semper.\r\n\r\nCras consequat lectus et justo vehicula, at tempus velit luctus. Morbi facilisis feugiat libero id placerat. Ut mattis libero eget vehicula sollicitudin. Donec vitae massa laoreet, eleifend ligula vitae, vestibulum lectus. Nulla molestie et urna ut condimentum. Nulla nec iaculis nulla. Proin a diam convallis, ultrices dolor at, pellentesque quam. Donec consequat eros vitae magna pulvinar, at aliquet leo porttitor. Maecenas a ante dolor. Aliquam vitae tortor malesuada, accumsan tellus ut, egestas dui. Praesent ut malesuada sem, vitae efficitur diam. In sit amet orci sed magna cursus commodo ac nec diam. Nullam vulputate sed justo nec sodales.",
//     status: 1,
//     status_detail: {
//       id: 1,
//       name: "To Do",
//       description: "Initial status of the tasks",
//     },
//     created_at: "2024-01-27T08:32:45.001270Z",
//     updated_at: "2024-02-01T10:20:30.337439Z",
//     complete_on: "2024-02-01T10:56:32.596818Z",
//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc efficitur purus non urna hendrerit condimentum. Morbi facilisis laoreet accumsan. Sed semper erat euismod augue aliquet feugiat a placerat eros. Phasellus fringilla lacus a quam fringilla, nec aliquam enim tincidunt. Nullam ultricies tellus enim, vitae rhoncus dui euismod sed. Phasellus fringilla vestibulum ipsum, eu feugiat leo vehicula nec. Sed et nibh ut nulla maximus varius. Proin pulvinar turpis turpis, vitae accumsan erat hendrerit congue. Morbi diam nulla, tempor non hendrerit eu, dapibus ut metus. Nullam magna nibh, varius quis dignissim a, semper ac nibh. Phasellus elementum ipsum sit amet sem feugiat, at facilisis lorem semper. Praesent vel sem rhoncus nisl commodo faucibus.\r\n\r\nInterdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ullamcorper justo vel ligula tempor lobortis. Nulla finibus felis vitae ipsum commodo, id viverra arcu convallis. Curabitur fringilla neque eros, vitae dignissim est convallis eget. Nunc sed lacus vitae libero scelerisque semper vel a ex. Morbi tristique aliquam augue. Aenean sodales tellus ex, et vestibulum felis euismod et. Quisque imperdiet massa id nulla cursus pulvinar. Ut egestas et libero nec viverra. Morbi quis erat est. In vitae massa interdum, pulvinar magna aliquet, fermentum nunc.\r\n\r\nSed et mauris erat. Nam accumsan vestibulum enim. Nam non neque pretium, commodo leo et, consequat leo. Nam eu urna non urna molestie fringilla eu et lectus. Suspendisse vulputate efficitur massa in ornare. Fusce vestibulum a enim vel vestibulum. Nullam ac magna quam. Aliquam condimentum porttitor magna, id molestie nisl rutrum sed. Aliquam auctor interdum ex, vitae dignissim odio viverra nec. Vestibulum tellus urna, sollicitudin vitae rhoncus et, placerat eget odio.\r\n\r\nDuis porta eu nulla vel condimentum. Duis dapibus lectus rutrum, eleifend erat id, bibendum quam. In bibendum quam ex, non tristique purus posuere sit amet. Vivamus hendrerit, purus ac egestas congue, turpis tortor gravida lacus, quis lacinia nisi tellus vel elit. Suspendisse non rutrum est. Suspendisse facilisis quam sit amet eros dictum, in varius ipsum facilisis. Duis congue nisl ante, sed fringilla purus rutrum vitae. Praesent dui eros, lobortis non mi at, sollicitudin mollis enim. Nulla rutrum fermentum pulvinar. Curabitur eget elit scelerisque, accumsan nibh id, tempus lectus. Suspendisse convallis quam odio, in accumsan erat dignissim quis. Vivamus nec porttitor elit.\r\n\r\nIn dolor magna, ultricies vel tortor quis, convallis porttitor massa. Nunc nec augue ac nulla mattis pharetra. Vivamus diam libero, molestie in ullamcorper non, venenatis vitae dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec dictum ipsum. Nunc odio leo, aliquam quis nisl a, tristique eleifend sem. Maecenas aliquam sed ante ut faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed at iaculis ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean mi magna, auctor sit amet arcu non, hendrerit rhoncus dolor. Curabitur pulvinar eros non ante fermentum imperdiet. Vivamus tempor massa sit amet ipsum lacinia ultrices a vel risus. Sed dapibus vulputate pharetra. Integer nulla nisl, tristique in vehicula id, placerat quis urna. Phasellus nec pharetra turpis.",
//     status: 1,
//     status_detail: {
//       id: 1,
//       name: "To Do",
//       description: "Initial status of the tasks",
//     },
//     created_at: "2024-02-01T10:13:38.356740Z",
//     updated_at: "2024-02-01T10:13:38.356782Z",
//     complete_on: "2024-02-01T10:56:32.596818Z",
//   },
//   {
//     id: 3,
//     title: "Nullam vulputate sed justo nec sodales.",
//     description:
//       "Duis consequat leo neque, id semper arcu blandit sed. Ut gravida pretium aliquam. Sed dignissim quam purus, nec mollis elit porttitor nec. Quisque efficitur nunc sed dolor placerat facilisis. Cras viverra congue erat. Pellentesque ac dolor quis dui molestie iaculis id ut ipsum. In ac fringilla urna, in congue urna.\r\n\r\nDonec non dictum lacus. Curabitur congue aliquet malesuada. Nulla odio velit, ornare et fermentum non, venenatis eu arcu. Praesent dignissim condimentum ante ut rutrum. Aliquam et tortor augue. Nullam suscipit tortor neque, eu scelerisque magna placerat at. Fusce ullamcorper nisi et ligula efficitur pulvinar.\r\n\r\nPellentesque laoreet tristique purus a ultricies. Sed eleifend semper ligula vel semper. Fusce vel ante euismod dui varius vulputate. Cras vitae nisi dolor. Etiam faucibus placerat odio, ac gravida ligula. Sed quis lorem mi. Curabitur est nunc, maximus et ligula eu, fermentum ultrices nisl. Nunc nec justo a ligula lobortis ultricies. Nam dapibus massa sit amet diam feugiat semper.\r\n\r\nCras consequat lectus et justo vehicula, at tempus velit luctus. Morbi facilisis feugiat libero id placerat. Ut mattis libero eget vehicula sollicitudin. Donec vitae massa laoreet, eleifend ligula vitae, vestibulum lectus. Nulla molestie et urna ut condimentum. Nulla nec iaculis nulla. Proin a diam convallis, ultrices dolor at, pellentesque quam. Donec consequat eros vitae magna pulvinar, at aliquet leo porttitor. Maecenas a ante dolor. Aliquam vitae tortor malesuada, accumsan tellus ut, egestas dui. Praesent ut malesuada sem, vitae efficitur diam. In sit amet orci sed magna cursus commodo ac nec diam. Nullam vulputate sed justo nec sodales.",
//     status: 1,
//     status_detail: {
//       id: 1,
//       name: "To Do",
//       description: "Initial status of the tasks",
//     },
//     created_at: "2024-02-01T10:14:35.887846Z",
//     updated_at: "2024-02-01T10:14:35.888123Z",
//     complete_on: "2024-02-01T10:56:32.596818Z",
//   },
// ];

type ModalDataType = {
  title: string;
  content: string | JSX.Element;
  isOpen: boolean;
};

const TaskList: React.FC = () => {
  const [modalData, setModalData] = useState<ModalDataType>({
    title: "Title",
    content: "",
    isOpen: false,
  });

  // Load the TaskList as well as the TaskStatues from API.
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.taskReducer.error);
  const loading = useAppSelector((state) => state.taskReducer.loading);

  const data = useAppSelector((state) => state.taskReducer.taskData);

  // fetch the TassStatues
  useEffect(() => {
    dispatch(fetchTaskStatus());
    dispatch(fetchTasks());
  }, [dispatch]);

  const displayTaskDetail = (task: TaskModel) => {
    setModalData((prev) => {
      return {
        ...prev,
        title: "Task Detail",
        content: <TaskDetail task={task} closeModal={closeModal} />,
        isOpen: true,
      };
    });
  };

  const displayTaskEditFrom = (task: TaskModel) => {
    setModalData((prev) => {
      return {
        ...prev,
        title: "Edit From",
        content: <EditTaskFrom task={task} closeModal={closeModal} />,
        isOpen: true,
      };
    });
  };

  // const displayTaskDeletionConfirmationFrom = (task: TaskModel) => {
  //   setModalData((prev) => {
  //     return {
  //       ...prev,
  //       title: "Task Detail",
  //       content: <TaskDetail task={task} />,
  //       isOpen: true,
  //     };
  //   });
  // };

  const closeModal = () => {
    setModalData((prev) => {
      return { ...prev, isOpen: false };
    });
  };

  const handleDelete = (id: number|string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };


  return (
    <>
      <div className="text-5xl subpixel-antialiased font-semibold text-center py-4">
        <h1>Task List</h1>
      </div>
      <div className="text-5xl subpixel-antialiased font-semibold text-center py-4">
        {loading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
        {error && !loading && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Danger alert!</span> Change a few
              things up and try submitting again.
            </div>
          </div>
        )}

        {!error && !loading && (
          <>
            
            <div className="flex items-right justify-end">
              <Link to="/add-task" className="w-full sm:w-1/4">
                <button
                  type="submit"
                  className="rounded-md btn bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                >
                  Add New Task
                </button>
              </Link>
            </div>
            <FilterTask
              data={data}
              renderFnc={(data) => {
                return (
                  <ul role="list" className="sm:mt-4">
                    {data &&
                      data.map((task) => (
                        <Task
                          key={task.id}
                          onClickView={displayTaskDetail}
                          onClickEdit={displayTaskEditFrom}
                          onClickDelete={handleDelete}
                          data={task}
                          title={task.title}
                          description={task.description}
                          status={task.status}
                        />
                      ))}
                  </ul>
                );
              }}
            />
          </>
        )}
      </div>

      {/* <ul role="list" className=""> */}
      {/* {data &&
          data.map((task) => (
            <Task
              key={task.id}
              _id={task.id}
              title={task.title}
              description={task.description}
              created_at={task.created_at}
              updated_at={task.updated_at}
              status={task.status}
              complete_on={task.complete_on}
            />
          ))} */}
      {/* </ul> */}
      <CustomModal
        title={modalData.title}
        content={modalData.content}
        isOpen={modalData.isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default TaskList;
