import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";

class FileUploaderService {
  uploadImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `/files/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => reject(error),
        async () => {
          const result = await getDownloadURL(uploadTask.snapshot.ref);
          
          resolve(result);
        }
      );
    });
  };
}

const fileUploaderService = new FileUploaderService();

export default fileUploaderService;
