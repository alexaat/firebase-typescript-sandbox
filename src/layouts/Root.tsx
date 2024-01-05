import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProvideUser } from "../context/UserContext";
import { AppBar, Box, Typography, Stack, Button } from "@mui/material";
import { firebaseLogOut } from "../services/firebase/auth";


const Root = () => {
    const {user, reloadUser} = ProvideUser();

    const navigate = useNavigate();

    const handleLogOut = () => {
        firebaseLogOut();
        navigate('signin');        
    }
    return (
        <>
            {user &&
                <AppBar position="static" sx={{ height: '42px' }}>
                    <Stack direction="row" sx={{ height: '100%', alignItems: 'center' }}>
                        <Box sx={{ ml: '8px' }}>
                            <Stack direction='row' spacing={1}>
                                <Typography>Home</Typography>                               
                            </Stack>
                        </Box>
                        <Stack direction='row' sx={{ position: 'absolute', right: '8px', height: '100%', alignItems: 'center' }}>
                            {
                                user && user.photoUrl &&
                                <Box component='img' src={user.photoUrl} sx={{width: '32px', height: '32px',  objectFit: 'contain', mr: 2, borderRadius: '50%'}}></Box>
                            }                            
                            <Box sx={{ mr: 2 }}>
                                <Stack spacing={1} direction='row'>
                                    <Typography>Name: {user?.name} | </Typography>
                                    <Typography> nick: {user?.nick}</Typography>
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