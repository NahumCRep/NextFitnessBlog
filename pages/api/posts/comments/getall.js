import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from '../../../../database';

export default async function GetAllComments(req, res) {
    let blogComments = []
    if(req.query.post){
        const commentsConsult = query(collection(database, "comments"), where("postname", "==", req.query.post))
        const snapshot = await getDocs(commentsConsult)
        snapshot.forEach((doc) => {
            blogComments.push({ id: doc.id, ...doc.data() })
        })
    }else{
        const commentsCollection = collection(database, 'comments')
        const snapshot = await getDocs(commentsCollection)
        snapshot.forEach((doc) => {
            blogComments.push({ id: doc.id, ...doc.data() })
        })
    }

    return res.status(200).json(blogComments)
}