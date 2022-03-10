import {collection, getDocs, query, where } from "firebase/firestore"
import { database } from "../../../database"

export default async function searchPost(req, res) {
    if(req.query.name){
        const postsConsult = query(collection(database, "posts"), where("title", "==", req.query.name))
        const docs = await getDocs(postsConsult)
        const postsData = []
        docs.forEach(doc => {
            postsData.push({ ...doc.data(), id: doc.id })
        })
        return res.json(postsData)
    }else if(req.query.category){
        const postsConsult = query(collection(database, "posts"), where("category", "==", req.query.category))
        const docs = await getDocs(postsConsult)
        const postsData = []
        docs.forEach(doc => {
            postsData.push({ ...doc.data(), id: doc.id })
        })
        return res.json(postsData)
    }else{
        res.json({message:'opcion de busqueda no establecida'})
    }
   
}