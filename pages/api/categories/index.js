import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { database } from "../../../database";

export default async function categorieslist({body, method}, res) {
    const categoriesCollection = collection(database, 'categories')

    if (method == 'GET') {
        const snapshot = await getDocs(categoriesCollection)
        const blogCategories = []
        snapshot.forEach((doc) => {
            blogCategories.push({ id: doc.id, ...doc.data() })
        })
        return res.status(200).json(blogCategories)
    }

    if (method == 'POST') {
        const doc = await addDoc(categoriesCollection, body)
        return res.status(200).json({message:'category added'}) 
    }

    if (method == 'PUT') {
        await updateDoc(doc(database, 'categories', body.id),{
            name: body.name
        })
        return res.status(200).json({message:'category edited'}) 
    }

    if (method == 'DELETE') {
        await deleteDoc(doc(database, 'categories', body.categorySelected.id))
        return res.status(200).json({message:'category deleted'}) 
    }

    return res.status(200).json({message:'operacion no disponible'})
}