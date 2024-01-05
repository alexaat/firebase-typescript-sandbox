import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { firebaseAuthStateListener } from "../services/firebase/auth";
import { firebaseGetUserInfo } from "../services/firebase/firestore";

const UserContext = createContext<{user: User | undefined | null, reloadUser: () => void}>({user: undefined, reloadUser: () =>{}});
export const ProvideUser = () => useContext(UserContext)
export const UserProvider = ({children} : {children : React.ReactNode}) => {
    
    const [user, setUser] = useState<User | undefined | null>(undefined);
    const [refreshUser, setRefreshUser] = useState(1);
    const reloadUser = () => {
        console.log('reload user')
        setRefreshUser(Math.random())
    };

    const authCallback = (user: User | null | undefined) => {
        if(user){
            firebaseGetUserInfo(userInfo => {
                    if(user.uid === userInfo.uid){
                        user.name = userInfo.name;                                               
                    }
                    setUser(user);
                }
            );
        }else{
            setUser(user);
        }       
    }

    useEffect(() => {
       return firebaseAuthStateListener(authCallback);      
    },[refreshUser]);


    return(    
    <UserContext.Provider value={{user, reloadUser}}>
        {children}
    </UserContext.Provider>)
}

/*
type T = {
    currentUser: (CurrentUser | null | undefined),
    reload: () => void
}

const UserContext = createContext<T | null>(null);
export const ProvideUser = () => useContext(UserContext)
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurtUser] = useState<CurrentUser | null | undefined>(undefined);
    const [refreshUser, setRefreshUser] = useState(1);
    const reloadCurrentUser = () => setRefreshUser(Math.random());
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurtUser(undefined)
            if (user) {
                const uid = user.uid;
                const email = user.email;
                const url = user.photoURL;
                const u: CurrentUser = {
                    uid: uid,
                    name: '',
                    nick: user.displayName ? user.displayName : '',
                    email: email ? email : '',
                    password: '',
                    photoUrl: url ? url : '',
                    transport: []
                }
                const q = query(collection(db, "users"), where("uid", "==", uid));
                getDocs(q)
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            u.name = doc.data().name;
                            u.transport = doc.data().transport;
                        })
                        setCurtUser(u)
                    })
            } else {
                setCurtUser(null)
            }
        });
        return unsubscribe
    }, [refreshUser]);
    return (
        <UserContext.Provider value={{currentUser, reload: reloadCurrentUser}}>
            {children}
        </UserContext.Provider>
    );}
export default UserContext;
*/