import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { KanbanItemTypes } from "../types";

class TaskService {
  getAll = async (uid: string) => {
    try {
      const doc_refs = await getDocs(query(collection(db, "tasks"), where('userId', '==', uid)));
      const res: any = [];
      doc_refs.forEach((task) => {
        res.push({
          id: task.id,
          ...task.data(),
        });
      });

      return res.filter((item: KanbanItemTypes) => item.isDeleted === false).sort((a: KanbanItemTypes, b: KanbanItemTypes) => a.order - b.order);
    } catch (error) {
      throw error;
    }
  };

  addTask = async (item: any) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...item
      });

    } catch (error) {
      throw error;
    }
  }

  moveTask = async(source: KanbanItemTypes, destinationBefore: number, destinationNext: number, destinationStatus: string) => {
    try {
      const destBeforeOrder = destinationBefore;
      const destNextOrder = destinationNext;
      const sourceRef = await updateDoc(doc(db, 'tasks', source.id), {
        order: (destBeforeOrder + destNextOrder) / 2,
        status: destinationStatus
      });
    } catch (error) {
      throw error;
    }
  }

  updateTask = async (item: any, id: string) => {
    try {
      await updateDoc(doc(db, 'tasks', id), item);
    } catch (error) {
      throw error;
    }
  }

  deleteTask = async (id: string) => {
    try {
      await updateDoc(doc(db, 'tasks', id), {
        isDeleted: true
      })
    } catch (error) {
      throw error;
    }
  }
}

const taskService = new TaskService();

export default taskService;
