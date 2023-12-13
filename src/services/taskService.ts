import { addDoc, collection, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { KanbanItemTypes } from "../types";

class TaskService {
  getAll = async () => {
    try {
      const doc_refs = await getDocs(query(collection(db, "tasks"), orderBy('order')));
      const res: any = [];
      doc_refs.forEach((task) => {
        res.push({
          id: task.id,
          ...task.data(),
        });
      });

      return res;
    } catch (error) {
      throw error;
    }
  };

  addTask = async (item: any, len: number) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...item
      });
      const orderRef = doc(collection(db, 'orders'), len.toString());
      await setDoc(orderRef, {taskId: docRef.id});
    } catch (error) {
      throw error;
    }
  }

  updateItem = async(source: KanbanItemTypes, destinationBefore: number, destinationNext: number, destinationStatus: string) => {
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
}

const taskService = new TaskService();

export default taskService;
