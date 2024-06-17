import { firestore } from '../utils/firebase';

export default defineEventHandler(async event => { 
    const ref = firestore.collection(`todos`);
    const snapshot = await ref.get();
    const result = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        result.push({ id: doc.id, ...data });
    });
    return result;
})