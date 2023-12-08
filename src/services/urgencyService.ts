import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase";

class UrgencyService {
  getAll = async () => {
    try {
      const doc_refs = await getDocs(query(collection(db, "urgency")));
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

const urgencyService = new UrgencyService();

export default urgencyService;
