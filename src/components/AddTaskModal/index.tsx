import { useState } from "react";
import {
  KanbanItemTypes,
  KanbanSubTaskItemTypes,
  KanbanTypeTypes,
  KanbanUrgencyTypes,
} from "../../types";
import { useFormik } from "formik";
import { newTaskSchema } from "../../utils/yupSchema";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";
import FormImageUploader from "../FormImageUploader";
import FormSelect from "../FormSelect";
import {
  useGetColumns,
  useGetTasks,
  useGetTypes,
  useGetUrgency,
  useGetUser,
} from "../../hooks";
import FormDateSelect from "../FormDateSelect";
import fileUploaderService from "../../services/fileUploadService";
import taskService from "../../services/taskService";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../store/tasks";

const AddTaskModal = ({
  handleCloseModal,
  initialValues,
  isEdit = false,
}: any) => {
  const dispatch = useDispatch();

  const user: any = useGetUser();
  const tasks: KanbanItemTypes[] = useGetTasks();
  const types: KanbanTypeTypes[] = useGetTypes();
  const urgency: KanbanUrgencyTypes[] = useGetUrgency();
  const columns = useGetColumns();

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema: newTaskSchema,
    validateOnChange: true,
    onSubmit: async () => {
      try {
        let result: any = "";
        if (values.file)
          result = await fileUploaderService.uploadImage(values.file);
        const { file, subTaskText, ...payload } = values;
        if (!isEdit) {
          await taskService.addTask({
            ...payload,
            isDeleted: false,
            status: columns.filter((item) => item.id === 0)[0].title,
            userId: user.uid,
            image: result,
            order: tasks.length,
          });
        } else {
          await taskService.updateTask(
            { ...payload, image: values.file ? result : values.image },
            values.id
          );
        }
        handleCloseModal();
        dispatch(fetchTasks(user?.uid))
      } catch (error) {
        alert(JSON.stringify(error));
      }
    },
  });

  const handleNewSubTask = () => {
    if (values.subTaskText === "") return;
    setFieldValue("subTasks", [
      ...values.subTasks,
      { content: values.subTaskText, isDone: false },
    ]);
    setFieldValue("subTaskText", "");
  };

  const handleItemStateChange = (index: number) => {
    const newSubTasks = values.subTasks.map(
      (item: KanbanSubTaskItemTypes, ind: number) =>
        ind === index ? { ...item, isDone: !item.isDone } : item
    );

    setFieldValue("subTasks", newSubTasks);
  };

  const handleUpload = (event: any) => {
    setFieldValue("file", event.target.files[0]);
    setFieldValue("fileName", event.target.files[0].name);
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-100vh max-h-full bg-gray-200 bg-opacity-80"
    >
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEdit ? "Edit Task" : "Create New Task"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-3">
              <div className="col-span-3">
                <FormInput
                  label="Title"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Type Title"
                  value={values.title}
                  handleChange={handleChange}
                  required
                  error={errors.title}
                />
              </div>
              <div className="col-span-3">
                <FormTextArea
                  label="Description"
                  name="description"
                  id="description"
                  placeholder="Type Description"
                  rows={4}
                  value={values.description}
                  handleChange={handleChange}
                  required
                  error={errors.description}
                />
              </div>
              <div className="col-span-3">
                <FormImageUploader
                  label="Image"
                  name="file"
                  id="file"
                  handleChange={handleUpload}
                />
                {values.file && (
                  <input
                    name="fileName"
                    value={values.fileName}
                    readOnly
                    disabled
                  />
                )}
              </div>
              <div className="col-span-3 sm:col-span-1">
                <FormDateSelect
                  label="Due Date"
                  name="dueDate"
                  id="dueDate"
                  placeholder="2023/12/07"
                  value={values.dueDate}
                  handleChange={handleChange}
                  required
                  error={errors.dueDate}
                />
              </div>
              <div className="sm:col-span-1 col-span-3">
                <FormSelect
                  label="Type"
                  id="type"
                  name="type"
                  lists={types}
                  value={values.type}
                  handleChange={handleChange}
                  required
                  error={errors.type}
                />
              </div>
              <div className="col-span-3 sm:col-span-1">
                <FormSelect
                  label="Urgency"
                  id="urgency"
                  name="urgency"
                  lists={urgency}
                  value={values.urgency}
                  handleChange={handleChange}
                  required
                  error={errors.urgency}
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="subTasks"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sub Tasks
                </label>
                <div className="bg-gray-50 dark:bg-gray-700">
                  {
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2">
                      {values.subTasks.map(
                        (item: KanbanSubTaskItemTypes, index: number) => {
                          return (
                            <li
                              className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                              key={`sub-task-${index}`}
                            >
                              <div className="flex items-center ps-3">
                                <input
                                  type="checkbox"
                                  checked={item.isDone}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onClick={() => handleItemStateChange(index)}
                                />
                                <label
                                  className={`w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${
                                    item.isDone && "line-through"
                                  }`}
                                >
                                  {item.content}
                                </label>
                              </div>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  }
                  <FormInput
                    label="SubTask"
                    type="text"
                    name="subTaskText"
                    id="subTaskText"
                    placeholder="Type Sub Task"
                    value={values.subTaskText}
                    handleChange={handleChange}
                    showLabel={false}
                  />
                  <button
                    type="button"
                    className="flex items-center w-full rounded-lg font-medium text-sm text-center p-2.5 dark:bg-gray-600 dark:text-gray-300"
                    onClick={handleNewSubTask}
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Add new sub task
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-red-800"
              disabled={!isValid}
            >
              {isEdit ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="me-1 -ms-1 w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              ) : (
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              {isEdit ? "Update task" : "Add new task"}
            </button>
          </form>
        </div>
        {isSubmitting && (
          <div className="absolute left-0 top-0 w-full h-[100%] ">
            <div className="bg-gray-700 opacity-20 w-full h-full"></div>
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTaskModal;
