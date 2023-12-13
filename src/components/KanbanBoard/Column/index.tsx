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
      <button className="hover:bg-slate-300 p-2 rounded inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>
    </div>
  );
};

const KanbanColumn = ({ text, lists }: KanbanRowProps) => {
  return (
    <div className="row-container p-2 w-96">
      <KanbanRowHeader text={`${text} (${lists.length} items)`} />
      <Droppable droppableId={text} key={text}>
        {(provided: DroppableProvided) => (
          <div
            className="kanban-lists min-h-[50px] bg-gray-200 p-2 mt-4"
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
