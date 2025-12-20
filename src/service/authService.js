import {auth, db} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { signOut } from "firebase/auth";

export async function signUp(email, username, password ) {
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

export async function logout() {
  return await signOut(auth);
}