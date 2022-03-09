import {collection, getDocs, query, where } from "firebase/firestore"
import { database } from "../../../database"

export default async function getPost(req, res) {
    const postsConsult = query(collection(database, "posts"), where("title", "==", req.query.name))
    const docs = await getDocs(postsConsult)
    const postsData = []
    docs.forEach(doc => {
        postsData.push({ ...doc.data(), id: doc.id })
    })
    return res.json(postsData)
}