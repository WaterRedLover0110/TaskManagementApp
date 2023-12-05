import { useState } from "react";
import {
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";
import { mockData } from "../../utils/mock";
import { KanbanColumn } from "../../components/KanbanBoard";
import { KanbanDataResponseTypes } from "../../types";

const Home = () => {
  // const arr = [
  // 	{
  // 		name: "North",
  // 		key: "12353",
  // 	},
  // 	{
  // 		name: "South",
  // 		key: "23463",
  // 	},
  // 	{
  // 		name: "East",
  // 		key: "54643",
  // 	},
  // 	{
  // 		name: "West",
  // 		key: "4435",
  // 	},
  // ];

  const [project, setProject] = useState<KanbanDataResponseTypes>(mockData);

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;
    
    let destinationArray = Array.from(project[destination.droppableId]);
    let sourceArray = Array.from(project[source.droppableId]);
    let newProjectData = {...project};

    const itemInserted = sourceArray[source.index];

    sourceArray.splice(source.index, 1);
    destinationArray.splice(destination.index ?? destinationArray.length + 1, 0, itemInserted);
    newProjectData = {...newProjectData, [source.droppableId]: sourceArray, [destination.droppableId]: destinationArray};

    setProject(newProjectData);
  };

  return (
    <div className="bg-gray-200 w-full h-full">
			<div className="flex p-4">
				<DragDropContext onDragEnd={onDragEnd}>
					{Object.entries(project).map(([key, value], index) => {
						return (
							<KanbanColumn text={key} lists={value} key={`kanban-row-${index}`} />
						);
					})}
				</DragDropContext>
			</div>
    </div>
  );
};

export default Home;
