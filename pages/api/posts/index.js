import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){
    const postsConsult = collection(database, 'posts')
    const docs = await getDocs(postsConsult)
    const posts = []
    docs.forEach(doc=>{
        posts.push({...doc.data(),id:doc.id})
    })
    return res.json(posts)
}