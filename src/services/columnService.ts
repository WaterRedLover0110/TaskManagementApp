import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";

class ColumnService {
	getAll = async () => {
		try {
			const doc_refs = await getDocs(query(collection(db, 'columns'), orderBy('id')));
			const res: any = [];
			doc_refs.forEach(column => {
				res.push({
					...column.data()
				})
			});

			return res;
		} catch (error) {
			throw error;
		}
	}
}

const columnService = new ColumnService();

export default columnService;