import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProvideUser } from "../context/UserContext";
import { AppBar, Box, Typography, Stack, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase/firebase-setup";


const Root = () => {
    const props = ProvideUser();

    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut(auth)
            .then(() => navigate('/'))
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
                            {
                                props && props.curUser && props.curUser.photoUrl &&
                                <Box component='img' src={props.curUser.photoUrl} sx={{width: '32px', height: '32px',  objectFit: 'contain'}}></Box>
                            }

                            
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
            <Outlet />
        </>
    );
}

export default Root;