import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import {
  KanbanItemTypes,
  KanbanRowHeaderProps,
  KanbanRowProps,
} from "../../../types";
import KanbanItem from "../Item";
import { Droppable, DroppableProvided } from "@hello-pangea/dnd";

const KanbanRowHeader = ({ text }: KanbanRowHeaderProps) => {
  return (
    <div className="flex justify-between p-4 w-full bg-white rounded-2xl text-lg">
      <p className="leading-8 text-indigo-500">{text}</p>
      <button className="bg-slate-200 hover:bg-slate-300 p-2 rounded inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4 text-indigo-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
};

const KanbanColumn = ({ text, lists }: KanbanRowProps) => {
  return (
    <div className="row-container p-2 w-96">
      <KanbanRowHeader text={text} />
      <Droppable droppableId={text} key={text}>
        {(provided: DroppableProvided) => (
          <div
            className="kanban-lists"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lists.map((item: KanbanItemTypes, index: number) => {
              return (
                <KanbanItem
                  data={item}
                  key={`kanban-item-${index}`}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
