import {collection,addDoc} from 'firebase/firestore'
import { database } from '../../../database'

export default async function create(req,res){

    const doc = await addDoc(
        collection(database,"posts"),
        req.body
    )


    return res.json({message:"Post Added"})
}