import { useNavigate, Navigate } from "react-router-dom";
import { ProvideUser } from "../../context/UserContext";
import { AppBar, Box, Typography, Stack, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebase/firebase-setup";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";


const Home = () => {

    const navigate = useNavigate();

    const props = ProvideUser();

    if (props?.curUser === null) {
        return <Navigate to='/' />
    }

    let transport: string[] = []

    const handleLogOut = () => {
        signOut(auth)
            .then(() => navigate('/'))
            .catch(err => alert(err))
    }

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

    return (
        <>
            {props?.curUser &&
                <AppBar position="static" sx={{ height: '36px' }}>
                    <Stack direction="row" sx={{ height: '100%', alignItems: 'center' }}>
                        <Box sx={{ ml: '8px' }}>
                            <Stack direction='row' spacing={1}>
                                <Typography>Home</Typography>
                                {props?.curUser.transport && <Typography color='text.secondary'> {props?.curUser.transport.join('-')} </Typography>}
                            </Stack>
                        </Box>
                        <Stack direction='row' sx={{ position: 'absolute', right: '8px', height: '100%', alignItems: 'center' }}>
                            <Box sx={{ mr: 2 }}>
                                <Stack spacing={1} direction='row'>
                                    <Typography>Name: {props?.curUser?.name} | </Typography>
                                    <Typography> nick: {props?.curUser?.nick}</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ p: 0, m: 0 }}>
                                <Button variant="text" sx={{ color: '#fff' }} onClick={handleLogOut}>log_out</Button>
                            </Box>
                        </Stack>
                    </Stack>
                </AppBar>
            }

            {props?.curUser &&
                <Stack sx={{ ml: 1, mt: 1, width: '128px' }}>
                    <form onSubmit={handleClickNext}>
                        <Stack>
                            <div>
                                <input type="checkbox" id="bike" name="bike" value="Bike" />
                                <label htmlFor="bike"> I have a bike</label>
                            </div>
                            <div>
                                <input type="checkbox" id="car" name="car" value="Car" />
                                <label htmlFor="car"> I have a car</label>
                            </div>
                            <div>
                                <input type="checkbox" id="boat" name="boat" value="Boat" />
                                <label htmlFor="boat"> I have a boat</label>
                            </div>
                            <input type='submit' value='next' />
                        </Stack>
                    </form>
                </Stack>
            }

        </>
    );
}

export default Home;