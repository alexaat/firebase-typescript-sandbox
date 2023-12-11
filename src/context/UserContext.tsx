import { createContext, useContext, useEffect, useState } from "react";
import { CurrentUser } from "../types/CurrentUser";
import { auth, db } from "../services/firebase/firebase-setup";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

type T = {
    curUser: (CurrentUser | null | undefined),
    reload: () => void
}

const UserContext = createContext<T | null>(null);

export const ProvideUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [curUser, setCurtUser] = useState<CurrentUser | null | undefined>(undefined);

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
        <UserContext.Provider value={{ curUser, reload: reloadCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserContext;