import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){
    const postsCollection = collection(database, 'posts')
    const snapshot = await getDocs(postsCollection)

    return res.json(snapshot.size)
}