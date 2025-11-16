import {auth, db} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function signUp(email, password, username) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: username,
        email: email,
        joinedAt: new Date()
    });

    return userCredential.user;
}

export async function login(email, password) {
    return await signInWithEmailAndPassword(auth,email,password);
}