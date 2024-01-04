import { Navigate } from "react-router-dom";
import { ProvideUser } from "../../context/UserContext";
import { Stack } from "@mui/material";
import { auth, db } from "../../services/firebase/firebase-setup";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import {Typography, Box, Button} from "@mui/material";
import { firebaseLogOut } from "../../services/firebase/auth";


const Home = () => {
    
    const user = ProvideUser();

    const handleLogOut = () => firebaseLogOut();
    

    /*
    if (props?.currentUser === null) {
        return <Navigate to='/' />
    }

    let transport: string[] = []

    const handleClickNext = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        transport = [];
        const hasBike = (event.currentTarget as HTMLFormElement).bike.checked;
        const hasCar = (event.currentTarget as HTMLFormElement).car.checked;
        const hasBoat = (event.currentTarget as HTMLFormElement).boat.checked;
        if (hasBike) transport.push('bike');
        if (hasCar) transport.push('car');
        if (hasBoat) transport.push('boat');

        const q = query(collection(db, "users"), where("uid", "==", auth?.currentUser?.uid));
        getDocs(q)
            .then(querySnapshot => {
                querySnapshot.forEach(document => {
                    const id = document.id
                    updateDoc(doc(db, 'users', id), {
                        transport
                    })
                        .then(() => props?.reload())


                })
            })
            .catch(err => alert(err))
    }
    */

    return (
        <>
        <Stack direction='row'>
        <Typography>{user?.email}</Typography>      
        <Button variant="outlined" sx={{ color: '#000', ml: 2 }} onClick={handleLogOut}>Log OUT</Button>        
        </Stack>

            {/* {props?.currentUser &&
                <Stack sx={{ ml: 1, mt: 1, width: '128px' }}>
                    <form onSubmit={handleClickNext}>
                        <Stack>
                            <div>
                                <input type="checkbox" id="bike" name="bike" value="Bike" checked={props.currentUser.transport.includes('bike')}/>
                                <label htmlFor="bike"> I have a bike</label>
                            </div>
                            <div>
                                <input type="checkbox" id="car" name="car" value="Car"  checked={props.currentUser.transport.includes('car')} />
                                <label htmlFor="car"> I have a car</label>
                            </div>
                            <div>
                                <input type="checkbox" id="boat" name="boat" value="Boat"  checked={props.currentUser.transport.includes('boat')} />
                                <label htmlFor="boat"> I have a boat</label>
                            </div>
                            <input type='submit' value='next' />
                        </Stack>
                    </form>
                </Stack>
            } */}

        </>
    );
}

export default Home;