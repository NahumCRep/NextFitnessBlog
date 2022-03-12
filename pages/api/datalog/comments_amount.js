import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){
    const commentsCollection = collection(database, 'comments')
    const snapshot = await getDocs(commentsCollection)
    
    return res.json(snapshot.size)
}