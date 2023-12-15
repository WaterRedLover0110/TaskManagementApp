import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";

import { KanbanItemProps, KanbanSubTaskRecordTypes } from "../../../types";
import { useGetTypes, useGetUrgency, useGetUser } from "../../../hooks";
import { deleteTask, fetchTasks } from "../../../store/tasks";

import Image from "../../Image";
import AddTaskModal from "../../AddTaskModal";
import { MenuIcon, CheckIcon} from "../../../icons";

const KanbanItem = ({ data, index }: KanbanItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();

  const user: any = useGetUser();
  const urgencyList = useGetUrgency();
  const typesList = useGetTypes();

  const calculateCompletedSubTask = (subtasks: KanbanSubTaskRecordTypes[]) => {
    return subtasks.filter((item) => item.isDone === true).length;
  };

  const completedSubTask = useMemo(
    () => calculateCompletedSubTask(data.subTasks),
    [data.subTasks]
  );

  const urgency = useMemo(
    () => urgencyList.filter((item) => item.value === data.urgency)[0]?.label,
    [urgencyList, data.urgency]
  );

  const type = useMemo(
    () => typesList.filter((item) => item.value === data.type)[0]?.label,
    [typesList, data.type]
  );

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEdit = () => {
    setShowMenu(false);
    setShowDialog(true);
  };

  const handleDelete = () => {
    dispatch(deleteTask(data.id));
    dispatch(fetchTasks(user?.uid));
    setShowMenu(false);
  };

  const handleCloseModal = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Draggable draggableId={data.id} key={data.id} index={index}>
        {(provided: DraggableProvided) => (
          <div
            className="kanban-item p-4 bg-white my-4 rounded-lg dark:bg-slate-800 dark:shadow-md"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex justify-between">
              <div className="kanban-item-type text-white rounded-lg bg-indigo-600 color-white dark:text-gray-300 px-2 py-1.5 inline-block text-sm mb-4">
                {" "}
                {type}
              </div>
              <div>
                <button
                  onClick={handleMenuClick}
                  className="dark:text-gray-300"
                >
                  <MenuIcon />
                </button>
                {showMenu && (
                  <div
                    id="dropdownDivider"
                    className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                      <li
                        onClick={handleEdit}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Edit
                      </li>
                      <li
                        onClick={handleDelete}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {data.image !== "" && (
              // <img src={data.image} className="rounded-xl" alt="Task Image" />
              <Image src={data.image} />
            )}
            <div className="kanban-content mb-2">
              <p className="text-indigo-500 text-base py-2 dark:text-gray-500">
                {data.title}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm break-words text-ellipsis whitespace-pre-line overflow-hidden w-full h-12 leading-6">
                {data.description}
              </p>
            </div>
            {!!data.dueDate && (
              <div className="kanban-date border-solid border border-gray-200 dark:border-gray-600 inline-block rounded-lg px-2 mb-2">
                <p className="text-sm text-indigo-500 dark:text-gray-400 inline">
                  {data.dueDate}
                </p>
              </div>
            )}
            <br />
            <div className="flex justify-between">
              <div className="kanban-item-type text-white rounded-lg bg-red-400 dark:bg-red-950 color-white dark:text-gray-300 px-2 py-1.5 text-sm inline-block">
                {" "}
                {urgency}
              </div>
              <div
                className={`kanban-subtask-state text-gray-500 flex items-center ${
                  completedSubTask === data.subTasks.length &&
                  completedSubTask !== 0
                    ? "text-green-500"
                    : ""
                }`}
              >
                <CheckIcon />
                <span
                  className={`ml-0.5 ${
                    completedSubTask === data.subTasks.length &&
                    completedSubTask !== 0
                      ? "line-through"
                      : ""
                  }`}
                >{`${completedSubTask} / ${data.subTasks.length}`}</span>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      {showDialog && (
        <AddTaskModal
          handleCloseModal={handleCloseModal}
          initialValues={{ ...data, file: null, subTaskText: "" }}
          isEdit
        />
      )}
    </>
  );
};

export default KanbanItem;
