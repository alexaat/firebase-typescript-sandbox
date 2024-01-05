import { UserInfo } from "../../types/User"
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from './firebase-setup';

export const firebaseGetUserInfo = (callback : (userInfo: UserInfo) => void) => {

    const userInfo: UserInfo = {
        uid: '',
        name: ''
    };

    if(auth.currentUser){
        const docRef = doc(db, "user_info", auth.currentUser.uid);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const name = docSnap.data().name;
                userInfo.uid = !auth.currentUser ?  '' : auth.currentUser.uid;
                userInfo.name = name;
                return callback(userInfo);
            }
        });
    }  

    // const q = query(collection(db, "users"), where("uid", "==", auth.currentUser?.uid));
    // getDocs(q)
    //     .then(querySnapshot => {
    //         querySnapshot.forEach(document => {
    //             const data = document.data();
    //             userInfo.uid = data.uid;
    //             userInfo.name = data.name;
    //             callback(userInfo);
    //             return;
    //         });
    //     });
}

export const firebaseGetTransport = (callback : (transport : string[]) => void) => {
    if(auth.currentUser){
        const docRef = doc(db, "transport", auth.currentUser.uid);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const vehicles = docSnap.data().vehicles;
                return callback(vehicles);
            }
        });
    }   
}

export const firebaseSaveTransport = (data: string[]) => {
    const user = auth.currentUser;
    if(user) {       
        setDoc(doc(db, "transport", user.uid), {           
            vehicles: data
          });
    }  
}

export const firebaseSaveUserInfo = (userInfo: UserInfo) => {
    setDoc(doc(db, 'user_info', userInfo.uid), {
        name: userInfo.name
    });    
}