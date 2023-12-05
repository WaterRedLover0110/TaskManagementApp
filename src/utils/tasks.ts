import { KanbanColumnTypes, KanbanDataTypes, KanbanItemTypes } from "../types";

export const generateKanbanData = (
  tasks: KanbanItemTypes[],
  columns: KanbanColumnTypes[]
) => {
  const columnsData: any = columns.reduce(
    (acc: any, cur: KanbanColumnTypes) => {
      acc[cur.id] = cur.title;
      return acc;
    },
    {}
  );

  return tasks.reduce((acc: KanbanDataTypes, cur) => {
    if (!(columnsData[cur.status] in acc)) acc[columnsData[cur.status]] = [];
    acc[columnsData[cur.status]].push(cur);
    return acc;
  }, {});
};
