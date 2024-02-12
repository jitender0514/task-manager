import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../../../Form/Fields/InputField";
import { FormData, TaskSchema } from "../../../../types/FormTypes";
import TextAreaField from "../../../Form/Fields/TextAreaField";
import SelectField from "../../../Form/Fields/SelectField";
import { createTask } from "../../../../store/api/TaskApi/TaskApi";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { Link } from "react-router-dom";

const AddTaskFrom: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(TaskSchema), // Apply the zodResolver
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      dispatch(createTask(data))
        .unwrap()
        .then(() => {
          methods.reset();
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
            <InputField
              type="date"
              label="Expected Date"
              placeholder="Expected Date"
              name="complete_on"
              error={methods.formState.errors.complete_on}
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

          <div className="mb-5 col-span-full sm:flex sm:items-center sm:justify-end sm:gap-x-6">
            <Link to="/" className="w-full sm:w-1/2">
              <button
                type="button"
                className="text-sm mt-5 btn font-semibold leading-6 text-gray-900 w-full "
              >
                Back to task list
              </button>
            </Link>
            <button
              type="submit"
              className="rounded-md mt-5 btn w-full sm:w-1/2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create New Task
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddTaskFrom;
