// import taskSlice from "./taskSlice";
import taskSlice from "./taskSlice";
import taskstatusSlice from "./taskstatusSlice";

const configReducers = {
    taskStatusReducer: taskstatusSlice,
    taskReducer: taskSlice,
};

export default configReducers;

