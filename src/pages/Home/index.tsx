import { useState } from "react";
import { DragDropContext , Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from 'react-beautiful-dnd';

interface Type{
	name: string,
	key: string
}

const Home = () => {
	const arr = [
		{
			name: "North",
			key: "12353",
		},
		{
			name: "South",
			key: "23463",
		},
		{
			name: "East",
			key: "54643",
		},
		{
			name: "West",
			key: "4435",
		},
	];

	const [project, setProject] = useState<Type []>(arr);

	const reorder = (list: any, startIndex: number, endIndex: number) => {
		const result: Type[] = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
		const projects = reorder(
      project,
      result.source.index,
      result.destination.index
    );
    //store reordered state.
    setProject(projects)
	}

	return (
		<>
			Hello! This is Stacklok.
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="list">
					{
						(provided: DroppableProvided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{
									project && project.map((item, index) => (
										<Draggable draggableId={item.key} key={item.key} index={index}>
											{
												(provided: DraggableProvided) => (
													<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
														<p style={{color: 'green'}}>{item.name}</p>
													</div>
												)
											}
										</Draggable>
									))
								}
								{provided.placeholder}
							</div>
						)
					}
				</Droppable>
			</DragDropContext>
		</>
	)
};

export default Home;