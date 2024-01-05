import { Stack, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProvideUser } from '../../context/UserContext';
import { useState } from 'react';
import { firebaseRegister } from '../../services/firebase/auth';


const SignUp = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const {user, reloadUser} = ProvideUser();


    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/signin');
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = (event.currentTarget as HTMLFormElement).first_name.value;
        const nick = (event.currentTarget as HTMLFormElement).nick.value;
        const email = (event.currentTarget as HTMLFormElement).email.value;
        const password = (event.currentTarget as HTMLFormElement).password.value;

        firebaseRegister(name, nick, email, password, selectedImage, () => {
            navigate('/');
            reloadUser();           
        })
    }

    const onImageSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {        
        const files =  event.target.files;
        if(files){
            const f =  files[0];
            setSelectedImage(f);
        }    
    }

    return (

        <>
        {
            selectedImage &&
            <Box component={'img'} sx={{ml: 1, width: '128px', height: '128px', objectFit: 'contain'}}  src={URL.createObjectURL(selectedImage)}/>
        }  

        <form onSubmit={submitHandler}>
            <Stack spacing={1} sx={{ m: 1, width: '250px' }}>
                <input type="file" onChange={onImageSelectedHandler}/>
                <input type="text" id="name" name="first_name" placeholder='name' />
                <input type="text" id="nick" name="nick" placeholder='nick' />
                <input type="email" id="email" name="fname" placeholder='email' />
                <input type="password" id="password" name="password" placeholder='password' />
                <input type="submit" value="Submit" />
                <Button variant="text" onClick={clickHandler}>Already have account</Button>
            </Stack>
        </form >
        </>

    )
}

export default SignUp;