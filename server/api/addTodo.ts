import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event: any, data: any) => {
    const doc = await firestore.collection("todos").add(data);
    return doc;
})