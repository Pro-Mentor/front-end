import { collection, doc, writeBatch, query, getDocs, serverTimestamp } from "firebase/firestore"
import { firestore } from "./firebase";

export interface FirebaseObject {
    title: string;
}

export interface FirebaseGetAllResponseObject {

}

const createDocument = async <T extends FirebaseObject>(collectionKey: string, params: T[]) => {

    const collectionRef = collection(firestore, collectionKey)
    const batch = writeBatch(firestore)

    params.forEach(item => {
        const documentRef = doc(collectionRef, item.title)
        batch.set(documentRef, {
            ...item,
            timestamp: serverTimestamp()
        })
    })

    await batch.commit()
    
}

const getAllCollections =async <T extends FirebaseGetAllResponseObject>(collectionKey: string) : Promise<T[]> => {

    const collectionRef = collection(firestore, collectionKey)

    const q = query(collectionRef)

    const querySnapShot = await getDocs(q)

    return querySnapShot.docs.map(docSnapshot => docSnapshot.data() as T)
    
}

export {
    createDocument,
    getAllCollections
}