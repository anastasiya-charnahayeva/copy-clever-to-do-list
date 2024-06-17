import { firestore } from '../utils/firebase';

export default defineEventHandler(async (body: any) => {
    const ref = firestore.collection(`todos`);
    const doc = await ref.doc(body.id).delete();
    return doc;
})