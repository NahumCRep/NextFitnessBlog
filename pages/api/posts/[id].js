import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore"
import { database } from "../../../database"

export default async function getPost(req,res){
    if(req.method == 'GET'){
        const post =  await getDoc(doc(database,"posts",req.query.id))
        return res.json({id:post.id, ...post.data()})
    }

    if(req.method == 'DELETE'){
        console.log(req.query.id)
        await deleteDoc(doc(database,"posts",req.query.id))
        return res.status(200).json({message:'post deleted'}) 
    }

    if(req.method == 'PUT'){
        await setDoc(doc(database,"posts",req.query.id), req.body)
        return res.status(200).json({message:'post edited'}) 
    }

    return res.status(200).json({message:'operacion no disponible'})
    
}