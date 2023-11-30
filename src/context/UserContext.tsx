import { createContext, useContext, useEffect, useState } from "react";
import { CurrentUser } from "../types/CurrentUser";
import { auth } from "../services/firebase/firebase-setup";
import { onAuthStateChanged } from "firebase/auth";


const UserContext = createContext<CurrentUser | null | undefined>(null);

export const ProvideUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [currentUser, setCurrentUser] = useState<CurrentUser | null | undefined>();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                const email = user.email;
                const u: CurrentUser = {
                    uid: uid,
                    name: '',
                    nick: user.displayName ? user.displayName : '',
                    email: email ? email : '',
                    password: '',
                    photoUrl: ''
                }
                setCurrentUser(u);
            }
        });

    }, []);

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
}
export default UserContext;