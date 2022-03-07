import { collection, getDocs, addDoc } from "firebase/firestore";
import { database } from "../../../database";

export default async function categorieslist(req, res) {
    const categoriesCollection = collection(database, 'categories')

    if (req.method == 'POST') {
        const doc = await addDoc(categoriesCollection, req.body)
        return res.status(200).json({message:'category added'}) 
    }

    if (req.method == 'GET') {
        const snapshot = await getDocs(categoriesCollection)
        const blogCategories = []
        snapshot.forEach((doc) => {
            blogCategories.push({ id: doc.id, ...doc.data() })
        })
        return res.status(200).json(blogCategories)
    }
    
}