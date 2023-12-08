import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../utils/firebase";
import { LoginFormState, RegisterFormState } from "../types";

const auth = getAuth(app);

class AuthService {
  signIn = async ({ email, password }: LoginFormState) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  };

  signUp = async ({ email, password }: RegisterFormState) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
}

const authService = new AuthService();

export default authService;
