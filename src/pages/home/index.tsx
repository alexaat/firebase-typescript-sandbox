import { useNavigate } from "react-router-dom";
import { ProvideUser } from "../../context/UserContext";
import { AppBar, Box, Typography, Stack, Button } from "@mui/material";
import { useEffect } from "react";
import { logOut } from "../../services/firebase/auth";

const Home = () => {

    const navigate = useNavigate();

    const user = ProvideUser();

    console.log(user)

    const handleLogOut = () => {
        logOut();
    }

    // useEffect(() => {
    //     console.log(user)
    //     if (!user) {
    //         navigate('/signup');
    //     }
    // }, []);

    return (
        <AppBar position="static" sx={{ height: '36px' }}>
            <Stack direction="row" sx={{ height: '100%', alignItems: 'center' }}>
                <Box sx={{ ml: '8px' }}>
                    <Typography>Home</Typography>
                </Box>
                <Stack direction='row' sx={{ position: 'absolute', right: '8px', height: '100%', alignItems: 'center' }}>
                    <Box sx={{ mr: 2 }}>
                        <Typography>{user?.nick}</Typography>
                    </Box>
                    <Box sx={{ p: 0, m: 0 }}>
                        <Button variant="text" sx={{ color: '#fff' }} onClick={handleLogOut}>log_out</Button>
                    </Box>
                </Stack>
            </Stack>
        </AppBar>
    );
}

export default Home;