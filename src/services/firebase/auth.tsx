import { createUserWithEmailAndPassword, UserCredential, onAuthStateChanged, User } from "firebase/auth";
import { CurrentUser } from "../../types/CurrentUser";
import { auth } from "./firebase-setup";




export const signUp = async (currentUser: CurrentUser): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, currentUser.email, currentUser.password)
    const uid = userCredential.user.uid;
    console.log(uid)
    return userCredential;
}

// export const watchCurrentUser = (callback: Dispatch<SetStateAction<CurrentUser | null | undefined>> | null => void) => {
//     onAuthStateChanged(auth, user => callback(user))
// }