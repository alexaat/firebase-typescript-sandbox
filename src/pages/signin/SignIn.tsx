import { Button, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../services/firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ProvideUser } from "../../context/UserContext";
import { firebaseLogIn } from "../../services/firebase/auth";

const SignIn = () => {

    const navigate = useNavigate();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.currentTarget as HTMLFormElement).email.value;
        const password = (event.currentTarget as HTMLFormElement).password.value;
        firebaseLogIn(email, password);
        navigate('/');

        // signInWithEmailAndPassword(auth, email, password)
        //     .then(() => {
        //         navigate('/home')
        //     })
        //     .catch(err => alert(err))

    }

    const clickHandler = () => {
        navigate('/signup');
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack spacing={1} sx={{ m: 1, width: '250px' }}>
                <input type="email" id="email" name="name" placeholder='email' />
                <input type="password" id="password" name="password" placeholder='password' />
                <input type="submit" value="Submit" />
                <Button variant="text" onClick={clickHandler}>Don't have an account</Button>
            </Stack>
        </form >

    );
}

export default SignIn;