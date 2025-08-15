// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAmMocZRjLbKRzc89AsFG4FwtcuNct70co',
  authDomain: 'my-personal-ecommerce.firebaseapp.com',
  projectId: 'my-personal-ecommerce',
  storageBucket: 'my-personal-ecommerce.firebasestorage.app',
  messagingSenderId: '677961296054',
  appId: '1:677961296054:web:3247f30b6b5c0b3e311e17',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
// const storage = getStorage(firebaseApp); // Si en el futuro necesitas guardar archivos

// 3. Exportar los servicios para usarlos en otras partes de tu aplicación (como en tus stores de Pinia)
export { auth, db }
