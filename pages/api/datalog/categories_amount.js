import {collection,getDocs,where,query} from 'firebase/firestore'
import { database } from '../../../database'

export default async function list(req,res){
    const categoriesCollection = collection(database, 'categories')
    const snapshot = await getDocs(categoriesCollection)
    // console.log(docs.size)
    return res.json(snapshot.size)
}