import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../../../Form/Fields/InputField";
import { EditTaskSchema, EditFormData } from "../../../../types/FormTypes";
import TextAreaField from "../../../Form/Fields/TextAreaField";
import SelectField from "../../../Form/Fields/SelectField";
import { updateTask } from "../../../../store/api/TaskApi/TaskApi";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { TaskModel } from "../../../../models/TaskModel";

type EditTaskFromProps = {
  task: TaskModel;
  closeModal: () => void;
};

const EditTaskFrom: React.FC<EditTaskFromProps> = ({
  task,
  closeModal,
}: EditTaskFromProps) => {
  const methods = useForm<EditFormData>({
    resolver: zodResolver(EditTaskSchema), // Apply the zodResolver
    defaultValues: EditTaskSchema.parse({
      title: task.title.substring(0, 250),
      description: task.description.substring(0, 999),
      status: `${task.status}`,
      // complete_on: task.complete_on
    }),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: EditFormData) => {
    try {
      dispatch(updateTask({ id: task.id, data: { ...task, ...data } }))
        .unwrap()
        .then((data) => {
          console.log(data);
          closeModal();
        })
        .catch((e) => {
          console.log(e);
        }); // Make a POST request

      // const { errors = {} } = response.data; // Destructure the 'errors' property from the response data

      // // Define a mapping between server-side field names and their corresponding client-side names
      // const fieldErrorMapping: Record<string, ValidFieldNames> = {
      //   title: "title",
      //   description: "description",
      //   status: "status",
      // };

      // // Find the first field with an error in the response data
      // const fieldWithError = Object.keys(fieldErrorMapping).find(
      //   (field) => errors[field]
      // );

      // // If a field with an error is found, update the form error state using setError
      // if (fieldWithError) {
      //   // Use the ValidFieldNames type to ensure the correct field names
      //   setError(fieldErrorMapping[fieldWithError], {
      //     type: "server",
      //     message: errors[fieldWithError],
      //   });
      // }
    } catch (error) {
      alert("Submitting form failed!");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-md mx-auto"
      >
        <div className="grid col-auto">
          <div className="mb-5 col-span-full">
            <InputField
              label="Title"
              type="title"
              placeholder="Title"
              name="title"
              error={methods.formState.errors.title}
            />
          </div>
          <div className="mb-5 col-span-full">
            <TextAreaField
              label="Description"
              placeholder="Description"
              name="description"
              error={methods.formState.errors.description}
            />
          </div>
          <div className="mb-5 col-span-full">
            <SelectField
              label="Status"
              type="number"
              placeholder="Select Status"
              name="status"
              error={methods.formState.errors.status}
              options={[
                { label: "To Do", value: 1 },
                { label: "In Progress", value: 2 },
                { label: "Done", value: 3 },
              ]}
            />
          </div>
          {/* <button type="submit" className="submit-button btn">
          Submit
        </button> */}

          <div className="col-span-full mb-4 sm:mt-6 sm:flex sm:items-center sm:justify-end sm:gap-x-6">
            <div className="mt-4  w-full col-span-full sm:w-1/2">
              <button
                onClick={() => closeModal()}
                type="button"
                className="text-sm btn w-full font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4  w-full col-span-full sm:w-1/2">
              <button
                type="submit"
                className="rounded-md btn w-full  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditTaskFrom;
