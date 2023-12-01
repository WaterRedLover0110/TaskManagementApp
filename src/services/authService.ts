import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import app from '../utils/firebase'
import { LoginFormState, RegisterFormState } from "../types"

const auth = getAuth(app);

class AuthService {
	signIn = (values: LoginFormState) => {

	}

	signUp = async (values: RegisterFormState) => {
		try {
			const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
			return result;
		} catch (error) {
			throw error;
		}
	}
}

const authService = new AuthService();

export default authService;