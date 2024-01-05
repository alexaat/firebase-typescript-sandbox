import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../services/firebase/firebase-setup';

export const uploadImage = (image: File, callback: (url: string) => void) => {
            const ext =  image.name.split('.').pop();
            const url = uuidv4() + '.' + ext;
            const imageRef = ref(storage,`/profile-images/${url}`);
                
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(url => {
                   callback(url);
                });
            });
}