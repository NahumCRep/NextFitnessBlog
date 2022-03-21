import {collection, getDocs, query, where } from "firebase/firestore"
import { database } from "../../../database"

export default async function allposts(req,res){
    const postsConsult = collection(database, 'posts')
    const docs = await getDocs(postsConsult)
    const postsData = []
    docs.forEach(doc => {
        postsData.push({ ...doc.data(), id: doc.id })
    })  
    return res.json(postsData)
}