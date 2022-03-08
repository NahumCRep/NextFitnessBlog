import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){
    const postsConsult = query(collection(database,"posts"),where("author.email","==","nahumcasco.v@gmail.com"))
    const docs = await getDocs(postsConsult)
    const postsData = []
    docs.forEach(doc=>{
        postsData.push({...doc.data(),id:doc.id})
    })
    return res.json(postsData)
}