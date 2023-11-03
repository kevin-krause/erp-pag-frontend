// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'real-estate-be1c6.firebaseapp.com',
    projectId: 'real-estate-be1c6',
    storageBucket: 'real-estate-be1c6.appspot.com',
    messagingSenderId: '158451913086',
    appId: '1:158451913086:web:f5d9abcdae7bdc8ec5232f'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
