import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const app = initializeApp({
    credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
})

export const firestore = getFirestore();