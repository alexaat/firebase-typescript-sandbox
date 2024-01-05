import { Stack, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProvideUser } from '../../context/UserContext';
import { useState } from 'react';
import { firebaseRegister } from '../../services/firebase/auth';



const SignUp = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

        console.log('sign up ',name, nick,email,password)
        if(selectedImage) console.log('selectedImage ',selectedImage) 

        firebaseRegister(name, nick, email, password, selectedImage, () => {
            console.log('navigate to /');
            navigate('/');
            //console.log(userCredential.user.uid);
            // const uid = userCredential.user.uid;
            // const userInfo : UserInfo = {
            //     uid: uid,
            //     name: name
            // }        
            // firebaseSaveUserInfo(userInfo, () => {})
        })

        // const currentUser: CurrentUser = {
        //     uid: '',
        //     name,
        //     nick,
        //     email,
        //     password,
        //     photoUrl: '',
        //     transport: []
        // }
        
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then(userCredential => {

        //         const user = userCredential.user;
        //         const uid = userCredential.user.uid;


        //         //Upload Image
        //         if(selectedImage){
        //             const ext =  selectedImage.name.split('.').pop();
        //             const url = uuidv4() + '.' + ext;
        //             const imageRef = ref(storage,`/profile-images/${url}`);
                
        //             uploadBytes(imageRef, selectedImage).then((snapshot) => {
        //                 getDownloadURL(snapshot.ref).then(url => {
        //                     updateProfile(user, { photoURL: url }).then(() => {
        //                         props?.reload();
        //                     });

        //                 });
        //             })
        //             .catch(e => console.log(e));                
        //         }

        //         addDoc(collection(db, 'users'), {
        //             uid,
        //             name
        //         })
        //             .then(() => {
        //                 updateProfile(user, { displayName: currentUser.nick }).then(() => {
        //                     props?.reload();
        //                     navigate('/home')
        //                 })
        //             })
        //     })
        //     .catch(err => alert(err))
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