import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase";

class TaskService {
	getAll = async () => {
		try {
			const doc_refs = await getDocs(query(collection(db, 'tasks')));
			const res: any = [];
			doc_refs.forEach(task => {
				res.push({
					...task.data()
				})
			});

			return res;	
		} catch (error) {
			throw error;
		}
	}
}

const taskService = new TaskService();

export default taskService;