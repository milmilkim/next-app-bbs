import config from '../../firebase.config';
import admin from 'firebase-admin';
import serviceAccount from '../../service_account.json';
import { ServiceAccount } from 'firebase-admin';
import { FirebaseError } from 'firebase/app';

const firebaseConfig = {
  databaseURL: config.databaseURL,
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
};

let app;
try {
  app = admin.initializeApp(firebaseConfig);
} catch (err) {
  if (err instanceof FirebaseError && !/already exists/u.test(err.message)) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    console.error('Firebase admin initialization error', err.stack);
  }
}

const auth = admin.auth(app);

export { auth };