import { createUserWithEmailAndPassword, UserCredential, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { CurrentUser } from "../../types/CurrentUser";
import { auth } from "./firebase-setup";

export const signUp = async (currentUser: CurrentUser): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, currentUser.email, currentUser.password)

    const u = auth.currentUser;

    if (u) {
        updateProfile(u, {
            displayName: currentUser.nick
        })
    }

    const uid = userCredential.user.uid;
    console.log(uid)
    return userCredential;
}

export const logIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
}

export const logOut = () => {
    signOut(auth)
}

// export const watchCurrentUser = (callback: Dispatch<SetStateAction<CurrentUser | null | undefined>> | null => void) => {
//     onAuthStateChanged(auth, user => callback(user))
// }