import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export default app;
export { auth, database, firestore, storage };
