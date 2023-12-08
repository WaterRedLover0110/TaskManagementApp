import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

class TaskService {
  getAll = async () => {
    try {
      const doc_refs = await getDocs(collection(db, "tasks"));
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
      alert(len.toString());
      await setDoc(orderRef, {taskId: docRef.id});
      alert(4);
    } catch (error) {
      throw error;
    }
  }
}

const taskService = new TaskService();

export default taskService;
