import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchTasks, getKanbanTasks, getTasks } from "../store/tasks";
import { useEffect } from "react";
import { fetchColumns, getColumns } from "../store/columns";
import { fetchTypes, getTypes } from "../store/types";
import { fetchUrgency, getUrgency } from "../store/urgency";

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
    if (!columns || columns.length === 0) {
      dispatch(fetchColumns("columns/fetchColumns"));
    }
  }, [columns, dispatch]);

  return columns;
};

export const useGetKanbanTasks = () => {
  const kanbanTasks = useSelector((state: RootState) => getKanbanTasks(state));

  return kanbanTasks;
};

export const useGetTypes = () => {
  const dispatch = useDispatch();
  const types = useSelector((state: RootState) => getTypes(state));

  useEffect(() => {
    if (!types || types.length === 0) {
      dispatch(fetchTypes("types/fetchTypes"));
    }
  }, [types, dispatch]);

  return types;
};

export const useGetUrgency = () => {
  const dispatch = useDispatch();
  const urgency = useSelector((state: RootState) => getUrgency(state));

  useEffect(() => {
    if (!urgency || urgency.length === 0) {
      dispatch(fetchUrgency("urgency/fetchUrgency"));
    }
  }, [urgency, dispatch]);

  return urgency;
};

export const useGetUser = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return user;
}