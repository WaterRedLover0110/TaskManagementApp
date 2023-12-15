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

import fileUploaderService from "../../services/fileUploadService";
import { useDispatch } from "react-redux";
import { addTask, fetchTasks, updateTask } from "../../store/tasks";
import FormDateSelect from "../FormDateSelect";
import LoadingComponent from "../LoadingComponent";
import { CloseIcon, EditIcon } from "../../icons";
import PlusIcon from "../../icons/PlusIcon";

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
          dispatch(
            addTask({
              ...payload,
              isDeleted: false,
              status: columns.filter((item) => item.id === 0)[0].title,
              userId: user.uid,
              image: result,
              order: tasks.length,
            })
          );
        } else {
          dispatch(
            updateTask({
              item: { ...payload, image: values.file ? result : values.image },
              id: values.id,
            })
          );
        }
        handleCloseModal();
        dispatch(fetchTasks(user?.uid));
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
              <CloseIcon />
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
                  src={values.file ? URL.createObjectURL(values.file) : values.image}
                  handleChange={handleUpload}
                  fileName={values.fileName}
                />
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
                    <PlusIcon />
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
                <EditIcon />
              ) : (
                <PlusIcon />
              )}
              {isEdit ? "Update task" : "Add new task"}
            </button>
          </form>
        </div>
        {isSubmitting && <LoadingComponent />}
      </div>
    </div>
  );
};

export default AddTaskModal;
