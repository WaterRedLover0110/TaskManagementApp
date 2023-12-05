import { DraggableProvided, DroppableProvided } from "react-beautiful-dnd";

export interface LoginFormState {
  email: string;
  password: string;
}

export interface RegisterFormState {
	email: string;
	name: string;
	password: string;
	confirm: string;
}

export interface FormInputProps {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: any;
  errors: any;
}

export interface KanbanSubTaskItemTypes {
  id: string,
  parentId: string,
  content: string,
  isDone: boolean
}

export interface KanbanItemTypes{
  id: string,
  title: string,
  description: string,
  subTask: KanbanSubTaskItemTypes [],
  image: string,
  urgency: number,
  user: string,
  status: number,
  isDeleted: boolean,
  type: number
}

export interface KanbanRowProps {
  text: string,
  lists: KanbanItemTypes []
}

export interface KanbanItemProps {
  data: KanbanItemTypes
  index: number
}

export interface KanbanRowHeaderProps {
  text: string
}

export interface KanbanDataTypes {
  [key: string]: KanbanItemTypes []
}

export interface KanbanColumnTypes {
  id: number,
  title: string
}