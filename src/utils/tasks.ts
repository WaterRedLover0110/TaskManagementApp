import { KanbanColumnTypes, KanbanDataTypes, KanbanItemTypes } from "../types";

export const generateKanbanData = (
  tasks: KanbanItemTypes[]
) => {
  return tasks.reduce((acc: KanbanDataTypes, cur) => {
    if (!(cur.status in acc)) acc[cur.status] = [];
    acc[cur.status].push(cur);
    return acc;
  }, {});
};
