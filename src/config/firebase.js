// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBeRVHCxadwi2NPR6HrFI9lGMk-feG74EY',
    authDomain: 'mutex-11dd2.firebaseapp.com',
    projectId: 'mutex-11dd2',
    storageBucket: 'mutex-11dd2.appspot.com',
    messagingSenderId: '215069092817',
    appId: '1:215069092817:web:c3d7f33e80391f83bc8ef0',
}
    
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
