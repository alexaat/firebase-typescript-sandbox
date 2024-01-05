import { createUserWithEmailAndPassword, UserCredential, updateProfile, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-setup";
import { User, UserInfo } from "../../types/User";
import { firebaseSaveUserInfo } from "./firestore";
import { uploadImage } from "./storage";

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

export const firebaseRegister = (name: string, nick: string, email: string, password: string, image: File | null, callback : () => void) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            
            callback();           
            
            const uid = userCredential.user.uid;

            //1. Update user with nickname and photo url
            if(image){
                uploadImage(image, url => {
                    updateProfile(userCredential.user, { photoURL: url, displayName: nick}).then(callback); 
                });
            }  

            // //2. Add userInfo with user name
            const userInfo: UserInfo = {
                uid: uid,
                name: name
            }
            firebaseSaveUserInfo(userInfo);
        });
}

export const firebaseLogOut = () => {
    signOut(auth);
}

export const firebaseAuthStateListener = (callback: (user: (User | null)) => void) => {
    return (
        onAuthStateChanged(auth, currentUser => {
            if(currentUser){

                const user = {
                    uid: currentUser.uid,
                    name: '',
                    nick: currentUser.displayName ? currentUser.displayName : '',
                    email: currentUser.email ? currentUser.email : '',
                    password: '',
                    photoUrl: currentUser.photoURL ? currentUser.photoURL : ''
                }
                callback(user);
            }else {
               callback(null);
            }
        })
    )
}






