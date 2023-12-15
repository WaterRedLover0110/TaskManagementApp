import MenuIcon from "../../../icons/MenuIcon";
import {
  KanbanItemTypes,
  KanbanRowHeaderProps,
  KanbanRowProps,
} from "../../../types";
import KanbanItem from "../Item";
import { Droppable, DroppableProvided } from "@hello-pangea/dnd";

const KanbanRowHeader = ({ text }: KanbanRowHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 w-full bg-white rounded-2xl text-lg dark:bg-gray-800">
      <p className="leading-8 text-indigo-500 dark:text-gray-400 text-sm">{text}</p>
      <button className="hover:bg-slate-300 dark:hover:bg-slate-600 dark:hover:text-gray-400 dark:text-gray-200 p-2 rounded inline-flex items-center">
        <MenuIcon />
      </button>
    </div>
  );
};

const KanbanColumn = ({ text, lists }: KanbanRowProps) => {
  return (
    <div className="row-container p-2 flex-1 flex flex-col">
      <KanbanRowHeader text={`${text} (${lists.length} items)`} />
      <Droppable droppableId={text} key={text}>
        {(provided: DroppableProvided) => (
          <div
            className="kanban-lists min-h-[50px] bg-gray-200 p-2 mt-4 flex-1 dark:bg-gray-800"
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
