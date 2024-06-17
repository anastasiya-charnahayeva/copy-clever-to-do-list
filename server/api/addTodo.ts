import { firestore } from '../utils/firebase';

export default defineEventHandler(async (body: any) => {
    const ref = firestore.collection(`todos`).doc();
    const doc = await ref.set(body);
    return doc;
})