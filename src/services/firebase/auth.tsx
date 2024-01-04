import { createUserWithEmailAndPassword, UserCredential, updateProfile, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { CurrentUser } from "../../types/CurrentUser";
import { auth } from "./firebase-setup";
import { User } from "../../types/User";

// export const signUp = async (currentUser: CurrentUser): Promise<UserCredential> => {
//     const userCredential = await createUserWithEmailAndPassword(auth, currentUser.email, currentUser.password)

//     const u = auth.currentUser;

//     if (u) {
//         updateProfile(u, {
//             displayName: currentUser.nick
//         })
//     }

//     const uid = userCredential.user.uid;
//     console.log(uid)
//     return userCredential;
// }

// export const logIn = (email: string, password: string) => {
//     signInWithEmailAndPassword(auth, email, password)
// }

// export const logOut = () => {
//     signOut(auth)
// }

export const firebaseLogIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password);
}

export const firebaseLogOut = () => {
    signOut(auth);
}

export const firebaseAuthStateListener = (callback: (user: (User | null)) => void) => {
    return (
        onAuthStateChanged(auth, currentUser => {
            console.log('currentUser ',currentUser)
            if(currentUser){
                callback({
                    uid: currentUser.uid,
                    name: '',
                    nick: currentUser.displayName ? currentUser.displayName : '',
                    email: currentUser.email ? currentUser.email : '',
                    password: '',
                    photoUrl: currentUser.photoURL ? currentUser.photoURL : '',
                });
            }else {
               callback(null);
            }
        })
    )
}




