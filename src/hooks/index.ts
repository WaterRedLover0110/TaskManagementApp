import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getKanbanTasks, getTasks } from "../store/tasks";
import { getColumns } from "../store/columns";
import { getTypes } from "../store/types";
import { getUrgency } from "../store/urgency";
import { KanbanUserTypes } from "../types";

export const useGetTasks = () => {
  const tasks = useSelector((state: RootState) => getTasks(state));

  return tasks;
};

export const useGetColumns = () => {
  const columns = useSelector((state: RootState) => getColumns(state));

  return columns;
};

export const useGetKanbanTasks = () => {
  const kanbanTasks = useSelector((state: RootState) => getKanbanTasks(state));

  return kanbanTasks;
};

export const useGetTypes = () => {
  const types = useSelector((state: RootState) => getTypes(state));

  return types;
};

export const useGetUrgency = () => {
  const urgency = useSelector((state: RootState) => getUrgency(state));

  return urgency;
};

export const useGetUser = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return user;
}
export const useGetTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.user.isDarkMode);
  
  return !!isDarkMode;
}