import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchTasks, getKanbanTasks, getTasks } from "../store/tasks";
import { useEffect } from "react";
import { fetchColumns, getColumns } from "../store/columns";

export const useGetTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => getTasks(state));

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      dispatch(fetchTasks("tasks/fetchTasks"));
    }
  }, [tasks, dispatch]);

  return tasks;
};

export const useGetColumns = () => {
	const dispatch = useDispatch();
	const columns = useSelector((state: RootState) => getColumns(state));

	useEffect(() => {
		if(!columns || columns.length === 0) {
			dispatch(fetchColumns("columns/fetchColumns"));
		}
	}, [columns, dispatch])

	return columns
}

export const useGetKanbanTasks = () => {
	const kanbanTasks = useSelector((state: RootState) => getKanbanTasks(state));

	return kanbanTasks;
}