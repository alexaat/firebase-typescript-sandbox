import { Button, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { logIn } from "../../services/firebase/auth";

const SignIn = () => {

    const navigate = useNavigate();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.currentTarget as HTMLFormElement).email.value;
        const password = (event.currentTarget as HTMLFormElement).password.value;
        logIn(email, password);
    }

    const clickHandler = () => {
        navigate('/signup');
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack spacing={1} sx={{ m: 1, width: '250px' }}>
                <input type="email" id="email" name="fname" placeholder='email' />
                <input type="password" id="password" name="password" placeholder='password' />
                <input type="submit" value="Submit" />
                <Button variant="text" onClick={clickHandler}>Don't have an account</Button>
            </Stack>
        </form >

    );
}

export default SignIn;