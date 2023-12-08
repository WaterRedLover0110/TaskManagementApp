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
import { useGetTasks, useGetTypes, useGetUrgency } from "../../hooks";
import FormDateSelect from "../FormDateSelect";
import fileUploaderService from "../../services/fileUploadService";
import taskService from "../../services/taskService";

const AddTaskModal = () => {
  const [subTaskText, setSubTaskText] = useState<string>("");
  const [subTasks, setSubTasks] = useState<KanbanSubTaskItemTypes[]>([]);

  const tasks: KanbanItemTypes[] = useGetTasks();
  const types: KanbanTypeTypes[] = useGetTypes();
  const urgency: KanbanUrgencyTypes[] = useGetUrgency();

  const handleNewSubTask = () => {
    setSubTasks([...subTasks, { content: subTaskText, isDone: false }]);
    setSubTaskText("");
  };

  const handleSubTaskInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTaskText(event.target.value);
  };

  const handleItemStateChange = (index: number) => {
    const newSubTasks = [...subTasks];
    newSubTasks[index].isDone = !newSubTasks[index].isDone;

    setSubTasks(newSubTasks);
  };

  const { handleChange, handleSubmit, values, errors, setFieldValue } = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      dueDate: "",
      type: "",
      urgency: "",
      subTasks: [],
      file: {}
    },
    validationSchema: newTaskSchema,
    validateOnChange: true,
    onSubmit: async () => {
      try {
        const result = await fileUploaderService.uploadImage(values.file);
        alert(result);
        const {file, ...payload} = values;
        await taskService.addTask({...payload, isDeleted: false, status: 0, userId: '012312', image: result}, tasks.length);

      } catch (error) {
        alert(JSON.stringify(error));
      }
    },
  });

  const handleUpload = (event: any) => {
    setFieldValue('file', event.target.files[0]);
  }

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-200 bg-opacity-80"
    >
      <div className="relative p-4 w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Task
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
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
                  value={values["title"]}
                  handleChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-3">
                <FormTextArea
                  label="Description"
                  name="description"
                  id="description"
                  placeholder="Type Description"
                  rows={4}
                  value={values["description"]}
                  handleChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-3">
                <FormImageUploader label="Image" name="file" id="file" handleChange={handleUpload}/>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <FormDateSelect
                  label="Due Date"
                  name="dueDate"
                  id="dueDate"
                  placeholder="2023/12/07"
                  value={values["dueDate"]}
                  handleChange={handleChange}
                  required
                />
              </div>
              <div className="sm:col-span-1 col-span-3">
                <FormSelect
                  label="Type"
                  id="type"
                  name="type"
                  lists={types}
                  value={values["type"]}
                  handleChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-3 sm:col-span-1">
                <FormSelect
                  label="Urgency"
                  id="urgency"
                  name="urgency"
                  lists={urgency}
                  value={values["urgency"]}
                  handleChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="subTasks"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sub Tasks
                </label>
                <div className="bg-gray-50">
                  {
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2">
                      {subTasks.map(
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
                  <input
                    type="text"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Sub Task..."
                    value={subTaskText}
                    onChange={handleSubTaskInputChange}
                  />
                  <button
                    className="flex items-center w-full rounded-lg font-medium text-sm text-center p-2.5"
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
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              Add new task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
