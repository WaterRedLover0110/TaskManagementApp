import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase";

class TypeService {
  getAll = async () => {
    try {
      const doc_refs = await getDocs(query(collection(db, "types")));
      const res: any = [];
      doc_refs.forEach((task) => {
        res.push({
          ...task.data(),
        });
      });

      return res;
    } catch (error) {
      throw error;
    }
  };
}

const typeService = new TypeService();

export default typeService;
