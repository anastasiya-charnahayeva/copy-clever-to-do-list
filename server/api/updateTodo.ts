import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event: any, data: any) => {
    const doc = await firestore.collection("todos").doc(data.id).update(data.data);
    return doc;
})