import { Stack, Button } from '@mui/material';
import { CurrentUser } from '../../types/CurrentUser';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebase/firebase-setup';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../services/firebase/firebase-setup';
import { ProvideUser } from '../../context/UserContext';



const SignUp = () => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/');
    }

    const props = ProvideUser();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = (event.currentTarget as HTMLFormElement).first_name.value;
        const nick = (event.currentTarget as HTMLFormElement).nick.value;
        const email = (event.currentTarget as HTMLFormElement).email.value;
        const password = (event.currentTarget as HTMLFormElement).password.value;

        const currentUser: CurrentUser = {
            uid: '',
            name,
            nick,
            email,
            password,
            photoUrl: '',
            transport: []
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {

                const user = userCredential.user;
                const uid = userCredential.user.uid;

                addDoc(collection(db, 'users'), {
                    uid,
                    name
                })
                    .then(() => {
                        updateProfile(user, { displayName: currentUser.nick }).then(() => {
                            props?.reload();
                            navigate('/home')

                        })
                    })


            })
            .catch(err => alert(err))
    }

    return (

        <form onSubmit={submitHandler}>
            <Stack spacing={1} sx={{ m: 1, width: '250px' }}>
                <input type="text" id="name" name="first_name" placeholder='name' />
                <input type="text" id="nick" name="nick" placeholder='nick' />
                <input type="email" id="email" name="fname" placeholder='email' />
                <input type="password" id="password" name="password" placeholder='password' />
                <input type="submit" value="Submit" />
                <Button variant="text" onClick={clickHandler}>Already have account</Button>
            </Stack>
        </form >

    )
}

export default SignUp;