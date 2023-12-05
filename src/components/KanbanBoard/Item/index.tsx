import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { KanbanItemProps } from "../../../types";

const KanbanItem = ({ data, index }: KanbanItemProps) => {
  return (
    <Draggable draggableId={data.id} key={data.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="kanban-item p-4 bg-white my-4 rounded-lg"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between">
            <div className="kanban-item-type text-white rounded-lg bg-indigo-600 color-white px-2 py-1.5 inline-block text-sm mb-4">
              {" "}
              Description
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <img src={data.image} className="rounded-xl" />
          <div className="kanban-content mb-2">
            <p className="text-indigo-500 text-base py-2">{data.title}</p>
            <p className="text-gray-700 text-sm break-words text-ellipsis whitespace-pre-line overflow-hidden w-full h-12 leading-6">
              {data.description}
            </p>
          </div>
          <div className="kanban-date border-solid border border-gray-200 inline-block rounded-lg px-2 mb-2">
            <p className="text-sm text-indigo-500 inline">Aug 20, 2021</p>
          </div>
          <br />
          <div className="flex justify-between">
            <div className="kanban-item-type text-white rounded-lg bg-red-600 color-white px-2 py-1.5 text-sm inline-block">
              {" "}
              Important
            </div>
            <div className="kanban-subtask-state text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-0.5">0/8</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanItem;
