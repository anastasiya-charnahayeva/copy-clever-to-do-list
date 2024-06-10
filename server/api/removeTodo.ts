import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event: any, id: string) => {
    const doc = await firestore.collection("todos").doc(id).delete();
    return doc;
})